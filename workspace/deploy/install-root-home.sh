#!/usr/bin/env bash
set -Eeuo pipefail

stamp="${1:-}"
if [[ ! "$stamp" =~ ^[0-9]{8}-[0-9]{6}$ ]]; then
  echo "Invalid deployment stamp" >&2
  exit 1
fi

workspace="/var/www/ffax/workspace"
archive="/tmp/ffax-root-home-${stamp}.tar.gz"
stage="/var/www/ffax/root-home.next-${stamp}"
backup="/var/backups/ffax/${stamp}-root-home"
nginx_current="/etc/nginx/sites-enabled/ffax.com"
switched=false

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
  local code=$?
  trap - ERR INT TERM
  set +e
  if [[ "$switched" == true ]]; then
    rm -rf "${workspace}/dist" "${workspace}/dist-root"
    mv "${workspace}/dist.previous-${stamp}" "${workspace}/dist"
    if [[ -d "${workspace}/dist-root.previous-${stamp}" ]]; then
      mv "${workspace}/dist-root.previous-${stamp}" "${workspace}/dist-root"
    fi
    cp -a "${backup}/ffax.com" "$nginx_current"
    cp -a "${backup}/provision.mjs" "${workspace}/infra/zitadel/provision/provision.mjs"
    nginx -t && systemctl reload nginx
  fi
  rm -rf "$stage"
  exit "$code"
}

trap rollback ERR INT TERM

rm -rf "$stage"
install -d -m 0755 "$stage"
install -d -m 0700 "$backup"
tar -xzf "$archive" -C "$stage"

forbidden_artifact="$(find "$stage" -type f \( -name '.DS_Store' -o -name '*.log' -o -name '*.bak' -o -name '*.old' -o -name '*.orig' -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.zip' -o -name '*.7z' \) -print -quit)"
if [[ -n "$forbidden_artifact" ]]; then
  echo "Forbidden backup, log or editor artifact remains in the root-home archive: ${forbidden_artifact}" >&2
  exit 1
fi

test -f "$stage/dist/index.html"
test -f "$stage/dist-root/index.html"
test -f "$stage/dist/ffax.svg"
test -f "$stage/dist-root/ffax.svg"
if [[ -e "$stage/dist/aurora.svg" || -e "$stage/dist-root/aurora.svg" ]]; then
  echo "Legacy Aurora brand icon remains in the root-home archive" >&2
  exit 1
fi
if grep -Eiq 'aurora\.svg|Aurora, the intuitive|fonts\.googleapis\.com|fonts\.gstatic\.com|prium\.github\.io/aurora' \
  "$stage/dist/index.html" "$stage/dist-root/index.html"; then
  echo "Legacy or remote template dependency remains in the root-home archive" >&2
  exit 1
fi
test -f "$stage/deploy/nginx/ffax.com.conf"
test -f "$stage/infra/zitadel/provision/provision.mjs"

cp -a "$nginx_current" "${backup}/ffax.com"
cp -a "${workspace}/infra/zitadel/provision/provision.mjs" "${backup}/provision.mjs"

cp -a "$stage/infra/zitadel/provision/provision.mjs" "${workspace}/infra/zitadel/provision/provision.mjs"
docker compose --env-file /etc/ffax/zitadel.env \
  -f "${workspace}/infra/zitadel/docker-compose.yml" \
  run --rm zitadel-provision

mv "${workspace}/dist" "${workspace}/dist.previous-${stamp}"
if [[ -d "${workspace}/dist-root" ]]; then
  mv "${workspace}/dist-root" "${workspace}/dist-root.previous-${stamp}"
fi
mv "$stage/dist" "${workspace}/dist"
mv "$stage/dist-root" "${workspace}/dist-root"
install -m 0644 "$stage/deploy/nginx/ffax.com.conf" "$nginx_current"
switched=true

nginx -t
systemctl reload nginx
curl --fail --silent --show-error --max-time 20 https://www.ffax.com/ >/dev/null
curl --fail --silent --show-error --max-time 20 https://www.ffax.com/workbench/ >/dev/null

rm -rf "${workspace}/dist.previous-${stamp}" "${workspace}/dist-root.previous-${stamp}" "$stage"
remove_matching_children "$workspace" "dist.previous-*"
remove_matching_children "$workspace" "dist-root.previous-*"
remove_matching_children "/var/www/ffax" "root-home.next-*"
remove_matching_children "/var/backups/ffax" "????????-??????-root-home" "$backup"
remove_matching_children "/tmp" "ffax-root-home-*.tar.gz"
trap - ERR INT TERM

echo "ROOT_HOME_DEPLOYED:${stamp}"
echo "BACKUP:${backup}"
