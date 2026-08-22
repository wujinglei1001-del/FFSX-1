#!/usr/bin/env bash
set -Eeuo pipefail

stamp="${1:-}"
if [[ ! "$stamp" =~ ^[0-9]{8}-[0-9]{6}$ ]]; then
  echo "Invalid deployment stamp" >&2
  exit 1
fi

workspace_root="/var/www/ffax/workspace"
next_workspace="/var/www/ffax/workspace.next-${stamp}"
previous_workspace="/var/www/ffax/workspace.previous-${stamp}"
archive="/tmp/ffax-release-${stamp}.tar.gz"
backup_root="/var/backups/ffax/${stamp}-static"
nginx_current="/etc/nginx/sites-enabled/ffax.com"
nginx_previous="${backup_root}/ffax.com"
switched=false

wait_http() {
  local url="$1"
  local attempts="${2:-30}"
  local delay="${3:-2}"
  local attempt

  for ((attempt = 1; attempt <= attempts; attempt += 1)); do
    if curl --fail --silent --show-error --max-time 15 "$url" >/dev/null; then
      return 0
    fi
    if [[ "$attempt" -lt "$attempts" ]]; then
      sleep "$delay"
    fi
  done

  echo "Health check failed after ${attempts} attempts: ${url}" >&2
  return 1
}

validate_frontend_bundle() {
  local bundle_root="$1"
  local public_prefix="$2"
  local minimum_asset_count="$3"
  local index_file="${bundle_root}/index.html"
  local asset_count
  local missing=0
  local url
  local relative

  test -f "$index_file"
  test -d "${bundle_root}/assets"
  test -f "${bundle_root}/ffax.svg"
  if [[ -e "${bundle_root}/aurora.svg" ]]; then
    echo "Legacy Aurora brand icon remains in frontend bundle: ${bundle_root}/aurora.svg" >&2
    return 1
  fi
  if grep -Eiq 'aurora\.svg|Aurora, the intuitive|fonts\.googleapis\.com|fonts\.gstatic\.com|prium\.github\.io/aurora' "$index_file"; then
    echo "Legacy or remote template dependency remains in frontend entry: ${index_file}" >&2
    return 1
  fi
  asset_count="$(find "${bundle_root}/assets" -type f | wc -l | tr -d ' ')"
  if (( asset_count < minimum_asset_count )); then
    echo "Incomplete frontend bundle: ${bundle_root} contains only ${asset_count} asset files" >&2
    return 1
  fi

  while IFS= read -r url; do
    url="${url%%\?*}"
    url="${url%%#*}"
    relative="${url#${public_prefix}}"
    if [[ "$relative" == "$url" || ! -f "${bundle_root}/${relative}" ]]; then
      echo "Missing frontend asset referenced by ${index_file}: ${url}" >&2
      missing=1
    fi
  done < <(
    grep -oE '(src|href)="[^"]+"' "$index_file" \
      | sed -E 's/^[^=]+="([^"]+)"$/\1/' \
      | grep -E "^${public_prefix}assets/" || true
  )

  (( missing == 0 ))
}

remove_matching_children() {
  local base="$1"
  local pattern="$2"
  local keep="${3:-}"
  local candidate
  local resolved

  for candidate in "${base}"/${pattern}; do
    [[ -e "$candidate" ]] || continue
    resolved="$(realpath -m -- "$candidate")"
    case "$resolved" in
      "${base}"/*) ;;
      *)
        echo "Refusing to remove unexpected path: ${resolved}" >&2
        return 1
        ;;
    esac
    [[ -n "$keep" && "$resolved" == "$keep" ]] && continue
    rm -rf -- "$resolved"
  done
}

rollback() {
  local exit_code=$?
  trap - ERR INT TERM
  set +e
  echo "Deployment failed; restoring the previous static release" >&2

  if [[ "$switched" == true && -d "$previous_workspace" ]]; then
    failed_workspace="/var/www/ffax/workspace.failed-${stamp}"
    mv -- "$workspace_root" "$failed_workspace"
    mv -- "$previous_workspace" "$workspace_root"
    if [[ -f "$nginx_previous" ]]; then
      install -m 0644 "$nginx_previous" "$nginx_current"
      nginx -t && systemctl reload nginx
    fi
    if [[ "$failed_workspace" == /var/www/ffax/workspace.failed-* ]]; then
      rm -rf -- "$failed_workspace"
    fi
  fi

  if [[ "$next_workspace" == /var/www/ffax/workspace.next-* ]]; then
    rm -rf -- "$next_workspace"
  fi
  rm -f -- "$archive"
  exit "$exit_code"
}
trap rollback ERR INT TERM

test -f "$archive"
test -f "$nginx_current"
if [[ "$(readlink -f "$workspace_root")" != "$workspace_root" ]]; then
  echo "Unexpected workspace root" >&2
  exit 1
fi
if [[ -e "$previous_workspace" ]]; then
  echo "Previous workspace target already exists: ${previous_workspace}" >&2
  exit 1
fi

install -d -m 0700 "$backup_root"
rm -rf -- "$next_workspace"
mkdir -p "$next_workspace"
tar -xzf "$archive" -C "$next_workspace"

forbidden_artifact="$(find "$next_workspace" -type f \( -name '.DS_Store' -o -name '*.log' -o -name '*.bak' -o -name '*.old' -o -name '*.orig' -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.zip' -o -name '*.7z' \) -print -quit)"
if [[ -n "$forbidden_artifact" ]]; then
  echo "Forbidden backup, log or editor artifact remains in the static production archive: ${forbidden_artifact}" >&2
  exit 1
fi

test -f "$next_workspace/infra/zitadel/docker-compose.yml"
test -f "$next_workspace/deploy/nginx/ffax.com.conf"
test -f "$next_workspace/scripts/api-reporting/check.mjs"
test -f "$next_workspace/docs/api-integrations/latest.json"
validate_frontend_bundle "$next_workspace/dist" "/workbench/" 20
validate_frontend_bundle "$next_workspace/dist-root" "/" 20

FFAX_API_REPORT_REQUIRE_DESKTOP=false \
  node "$next_workspace/scripts/api-reporting/check.mjs" \
  --root "$next_workspace" \
  --no-desktop

install -m 0644 "$nginx_current" "$nginx_previous"
mv -- "$workspace_root" "$previous_workspace"
mv -- "$next_workspace" "$workspace_root"
install -m 0644 "$workspace_root/deploy/nginx/ffax.com.conf" "$nginx_current"
switched=true
nginx -t
systemctl reload nginx

wait_http https://www.ffax.com/ 15 2
wait_http https://www.ffax.com/workbench/ 15 2
wait_http https://www.ffax.com/workbench-api/health 15 2
wait_http https://www.ffax.com/marketplace-api/health 15 2
wait_http https://www.ffax.com/sync-api/health 15 2
wait_http https://www.ffax.com/integration-api/warehouse/health 15 2
wait_http https://www.ffax.com/integration-api/marketplace/health 15 2
wait_http https://www.ffax.com/integration-api/logistics/health 15 2
wait_http https://www.ffax.com/integration-api/commerce/health 15 2

remove_matching_children "/var/www/ffax" "workspace.previous-*"
remove_matching_children "/var/www/ffax" "workspace.failed-*"
remove_matching_children "/var/www/ffax" "workspace.next-*"
remove_matching_children "/var/backups/ffax" "????????-??????-static" "$backup_root"
rm -f -- "$archive"

trap - ERR INT TERM
echo "DEPLOYED:${stamp}"
echo "BACKUP:${backup_root}"
