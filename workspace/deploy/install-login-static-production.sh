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
backup_root="/var/backups/ffax/${stamp}"
nginx_current="/etc/nginx/sites-enabled/ffax.com"
nginx_previous="${backup_root}/ffax.com"
zitadel_env="/etc/ffax/zitadel.env"
ffax_api_env="/etc/ffax/platform/ffax-api.env"
zitadel_login_image="ffax/zitadel-login:v4.15.0-ffax-${stamp}"
old_zitadel_login_image=""
old_ffax_api_image=""
login_changed=false
switched=false

container_image() {
  docker inspect --format '{{.Config.Image}}' "$1" 2>/dev/null || true
}

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
  local index_file="${bundle_root}/index.html"
  local asset_count
  local missing=0
  local url
  local relative

  test -f "$index_file"
  test -d "${bundle_root}/assets"
  asset_count="$(find "${bundle_root}/assets" -type f | wc -l | tr -d ' ')"
  if (( asset_count < 200 )); then
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

restore_login() {
  local compose_file="$workspace_root/infra/zitadel/docker-compose.yml"
  if [[ -n "$old_zitadel_login_image" && -f "$compose_file" ]]; then
    FFAX_API_IMAGE="$old_ffax_api_image" \
    FFAX_API_ENV_FILE="$ffax_api_env" \
    FFAX_ZITADEL_LOGIN_IMAGE="$old_zitadel_login_image" \
      docker compose --env-file "$zitadel_env" -f "$compose_file" \
        up -d --wait --no-deps --no-build zitadel-login
  fi
}

rollback() {
  local exit_code=$?
  trap - ERR INT TERM
  set +e
  echo "Deployment failed; restoring the previous static release and login image" >&2

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

  if [[ "$login_changed" == true ]]; then
    restore_login
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
test -f "$zitadel_env"
test -f "$ffax_api_env"
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

test -f "$next_workspace/infra/zitadel/custom-login/Dockerfile"
test -f "$next_workspace/infra/zitadel/docker-compose.yml"
test -f "$next_workspace/deploy/nginx/ffax.com.conf"
test -f "$next_workspace/scripts/api-reporting/check.mjs"
test -f "$next_workspace/docs/api-integrations/latest.json"
validate_frontend_bundle "$next_workspace/dist" "/workbench/"
validate_frontend_bundle "$next_workspace/dist-root" "/"

FFAX_API_REPORT_REQUIRE_DESKTOP=false \
  node "$next_workspace/scripts/api-reporting/check.mjs" \
  --root "$next_workspace" \
  --no-desktop

old_zitadel_login_image="$(container_image ffax-zitadel-zitadel-login-1)"
old_ffax_api_image="$(container_image ffax-zitadel-ffax-api-1)"
test -n "$old_zitadel_login_image"
test -n "$old_ffax_api_image"
docker image inspect "$zitadel_login_image" >/dev/null

install -m 0644 "$nginx_current" "$nginx_previous"

login_changed=true
FFAX_API_IMAGE="$old_ffax_api_image" \
FFAX_API_ENV_FILE="$ffax_api_env" \
FFAX_ZITADEL_LOGIN_IMAGE="$zitadel_login_image" \
  docker compose --env-file "$zitadel_env" \
    -f "$next_workspace/infra/zitadel/docker-compose.yml" \
    up -d --wait --no-deps --no-build zitadel-login

wait_http https://www.ffax.com/ui/v2/login/healthy 30 2

mv -- "$workspace_root" "$previous_workspace"
mv -- "$next_workspace" "$workspace_root"
install -m 0644 "$workspace_root/deploy/nginx/ffax.com.conf" "$nginx_current"
switched=true
nginx -t
systemctl reload nginx

wait_http https://www.ffax.com/ 15 2
wait_http https://www.ffax.com/workbench/ 15 2
wait_http https://www.ffax.com/ui/v2/login/healthy 15 2
wait_http https://www.ffax.com/workbench-api/health 15 2
wait_http https://www.ffax.com/marketplace-api/health 15 2
wait_http https://www.ffax.com/sync-api/health 15 2
wait_http https://www.ffax.com/integration-api/warehouse/health 15 2
wait_http https://www.ffax.com/integration-api/marketplace/health 15 2
wait_http https://www.ffax.com/integration-api/logistics/health 15 2
wait_http https://www.ffax.com/integration-api/commerce/health 15 2

trap - ERR INT TERM
rm -f -- "$archive"
echo "DEPLOYED:${stamp}"
echo "ROLLBACK:${previous_workspace}"
