#!/usr/bin/env bash
set -Eeuo pipefail

stamp="${1:-}"
if [[ ! "$stamp" =~ ^[0-9]{8}-[0-9]{6}$ ]]; then
  echo "Invalid deployment stamp" >&2
  exit 1
fi

workspace="/var/www/ffax/workspace"
images_archive="/tmp/ffax-images-${stamp}.tar"
release_archive="/tmp/ffax-release-${stamp}.tar.gz"
zitadel_env="/etc/ffax/zitadel.env"
platform_env="/etc/ffax/platform/compose.env"
ffax_api_env="/etc/ffax/platform/ffax-api.env"
mercur_env="/etc/ffax/platform/mercur.env"
channels_env="/etc/ffax/platform/channels.env"
backup_root="/var/backups/ffax/${stamp}"
ffax_api_image="ffax/api:${stamp}"
mercur_image="ffax/mercur:${stamp}"
channel_image="ffax/channel-runtime:${stamp}"
old_ffax_api_image=""
old_mercur_image=""
old_channel_image=""
runtime_changed=false

container_image() {
  docker inspect --format '{{.Config.Image}}' "$1" 2>/dev/null || true
}

wait_http() {
  local url="$1"
  local attempts="${2:-30}"
  local attempt
  for ((attempt = 1; attempt <= attempts; attempt += 1)); do
    if curl --fail --silent --show-error --max-time 15 "$url" >/dev/null; then
      return 0
    fi
    if [[ "$attempt" -lt "$attempts" ]]; then
      sleep 2
    fi
  done
  echo "Health check failed: ${url}" >&2
  return 1
}

platform_compose() {
  MERCUR_IMAGE="$1" MERCUR_ENV_FILE="$mercur_env" \
    docker compose --env-file "$platform_env" \
      -f "$workspace/infra/platform/docker-compose.yml" "${@:2}"
}

zitadel_compose() {
  FFAX_API_IMAGE="$1" FFAX_API_ENV_FILE="$ffax_api_env" \
    docker compose --env-file "$zitadel_env" \
      -f "$workspace/infra/zitadel/docker-compose.yml" "${@:2}"
}

channel_compose() {
  FFAX_CHANNEL_IMAGE="$1" \
    docker compose --env-file "$channels_env" \
      -f "$workspace/infra/platform/docker-compose.channels.yml" "${@:2}"
}

rollback_runtime() {
  local exit_code=$?
  trap - ERR INT TERM
  set +e
  echo "Runtime deployment failed; restoring previous images" >&2
  if [[ "$runtime_changed" == true ]]; then
    if [[ -n "$old_ffax_api_image" ]]; then
      zitadel_compose "$old_ffax_api_image" \
        --profile production up -d --wait --no-deps --no-build ffax-api
    fi
    if [[ -n "$old_mercur_image" ]]; then
      platform_compose "$old_mercur_image" \
        up -d --wait --no-build mercur-api mercur-worker
    fi
    if [[ -n "$old_channel_image" ]]; then
      channel_compose "$old_channel_image" \
        up -d --wait --no-build \
          warehouse-api warehouse-worker warehouse-gateway \
          marketplace-channel-api marketplace-worker marketplace-gateway \
          logistics-api logistics-worker logistics-gateway \
          commerce-api commerce-worker commerce-gateway sync-api
    fi
  fi
  exit "$exit_code"
}
trap rollback_runtime ERR INT TERM

test -f "$release_archive"
test -f "$workspace/deploy/install-static-production.sh"
test -f "$zitadel_env"
test -f "$platform_env"
test -f "$ffax_api_env"
test -f "$mercur_env"
test -f "$channels_env"

old_ffax_api_image="$(container_image ffax-zitadel-ffax-api-1)"
old_mercur_image="$(container_image ffax-platform-mercur-api-1)"
old_channel_image="$(container_image ffax-channels-warehouse-api-1)"
test -n "$old_ffax_api_image"
test -n "$old_mercur_image"
test -n "$old_channel_image"

if ! docker image inspect "$ffax_api_image" >/dev/null 2>&1 || \
   ! docker image inspect "$mercur_image" >/dev/null 2>&1 || \
   ! docker image inspect "$channel_image" >/dev/null 2>&1; then
  test -f "$images_archive"
  docker load -i "$images_archive"
fi
docker image inspect "$ffax_api_image" >/dev/null
docker image inspect "$mercur_image" >/dev/null
docker image inspect "$channel_image" >/dev/null

install -d -m 0700 "$backup_root"
set -a
. "$platform_env"
. "$zitadel_env"
set +a
docker compose --env-file "$platform_env" \
  -f "$workspace/infra/platform/docker-compose.yml" \
  exec -T platform-db pg_dump -U "$FFAX_DATABASE_USER" "$FFAX_DATABASE_NAME" \
  | gzip -9 > "$backup_root/ffax-platform.sql.gz"
docker compose --env-file "$platform_env" \
  -f "$workspace/infra/platform/docker-compose.yml" \
  exec -T mercur-db pg_dump -U "$MERCUR_DATABASE_USER" "$MERCUR_DATABASE_NAME" \
  | gzip -9 > "$backup_root/mercur.sql.gz"
docker compose --env-file "$zitadel_env" \
  -f "$workspace/infra/zitadel/docker-compose.yml" \
  exec -T postgres pg_dump -U "$POSTGRES_ADMIN_USER" "$POSTGRES_DB" \
  | gzip -9 > "$backup_root/zitadel.sql.gz"

runtime_changed=true
if [[ "${FFAX_SKIP_MERCUR_MIGRATIONS:-false}" != "true" ]]; then
  platform_compose "$mercur_image" run --rm --no-deps mercur-api npm run predeploy
fi
platform_compose "$mercur_image" up -d --wait --no-build mercur-api mercur-worker
zitadel_compose "$ffax_api_image" \
  --profile production up -d --wait --no-deps --no-build ffax-api
channel_compose "$channel_image" \
  up -d --wait --no-build \
    warehouse-api warehouse-worker warehouse-gateway \
    marketplace-channel-api marketplace-worker marketplace-gateway \
    logistics-api logistics-worker logistics-gateway \
    commerce-api commerce-worker commerce-gateway sync-api

wait_http http://127.0.0.1:9000/health
wait_http http://127.0.0.1:8000/api/health
wait_http http://127.0.0.1:8300/health
wait_http http://127.0.0.1:9101/health
wait_http http://127.0.0.1:9102/health
wait_http http://127.0.0.1:9103/health
wait_http http://127.0.0.1:9104/health

bash "$workspace/deploy/install-static-production.sh" "$stamp"

wait_http https://www.ffax.com/workbench-api/health 15
wait_http https://www.ffax.com/marketplace-api/health 15

trap - ERR INT TERM
rm -f -- "$images_archive" "$release_archive"
echo "RUNTIME_DEPLOYED:${stamp}"
echo "FFAX_API_IMAGE:${ffax_api_image}"
echo "MERCUR_IMAGE:${mercur_image}"
echo "CHANNEL_IMAGE:${channel_image}"
