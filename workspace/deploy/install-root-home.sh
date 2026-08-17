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

test -f "$stage/dist/index.html"
test -f "$stage/dist-root/index.html"
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
trap - ERR INT TERM

echo "ROOT_HOME_DEPLOYED:${stamp}"
echo "BACKUP:${backup}"

