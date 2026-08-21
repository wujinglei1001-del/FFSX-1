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
secret_root="/etc/ffax"
platform_secret_root="${secret_root}/platform"
platform_env="${platform_secret_root}/compose.env"
mercur_env="${platform_secret_root}/mercur.env"
ffax_api_env="${platform_secret_root}/ffax-api.env"
channels_env="${platform_secret_root}/channels.env"
openbao_secret_root="${secret_root}/openbao"
openbao_operator_file="${openbao_secret_root}/operator.json"
openbao_app_dir="${openbao_secret_root}/apps"
zitadel_env="${secret_root}/zitadel.env"
backup_root="/var/backups/ffax/${stamp}"
nginx_current="/etc/nginx/sites-enabled/ffax.com"
nginx_previous="${backup_root}/ffax.com"
mercur_image="ffax/mercur:2.3.1-${stamp}"
ffax_api_image="ffax/api:${stamp}"
channel_image="ffax/channel-runtime:${stamp}"
switched=false
services_changed=false
old_mercur_image=""
old_ffax_api_image=""
old_channel_image=""

platform_compose() {
  MERCUR_IMAGE="$mercur_image" MERCUR_ENV_FILE="$mercur_env" \
    docker compose --env-file "$platform_env" \
      -f "$next_workspace/infra/platform/docker-compose.yml" "$@"
}

channel_compose() {
  FFAX_CHANNEL_IMAGE="$channel_image" \
    docker compose --env-file "$channels_env" \
      -f "$next_workspace/infra/platform/docker-compose.channels.yml" "$@"
}

openbao_compose() {
  docker compose -f "$next_workspace/infra/secrets/docker-compose.yml" "$@"
}

observability_compose() {
  docker compose -f "$next_workspace/infra/observability/docker-compose.yml" "$@"
}

zitadel_compose() {
  FFAX_API_IMAGE="$ffax_api_image" FFAX_API_ENV_FILE="$ffax_api_env" \
    docker compose --env-file "$zitadel_env" \
      -f "$next_workspace/infra/zitadel/docker-compose.yml" "$@"
}

container_image() {
  docker inspect --format '{{.Config.Image}}' "$1" 2>/dev/null || true
}

random_secret() {
  openssl rand -hex "${1:-24}"
}

env_value() {
  local file="$1"
  local key="$2"
  awk -v key="$key" 'index($0, key "=") == 1 { print substr($0, length(key) + 2); exit }' "$file"
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
  echo "Deployment failed; restoring the previous release" >&2

  if [[ "$switched" == true ]]; then
    if [[ -d "$workspace_root" && -d "$previous_workspace" ]]; then
      failed_workspace="/var/www/ffax/workspace.failed-${stamp}"
      mv -- "$workspace_root" "$failed_workspace"
      mv -- "$previous_workspace" "$workspace_root"
    fi
    if [[ -f "$nginx_previous" ]]; then
      install -m 0644 "$nginx_previous" "$nginx_current"
      nginx -t && systemctl reload nginx
    fi
  fi

  if [[ "$services_changed" == true ]]; then
    rollback_compose="$next_workspace/infra/platform/docker-compose.yml"
    rollback_channels="$next_workspace/infra/platform/docker-compose.channels.yml"
    rollback_zitadel="$next_workspace/infra/zitadel/docker-compose.yml"
    [[ -f "$workspace_root/infra/platform/docker-compose.yml" ]] && rollback_compose="$workspace_root/infra/platform/docker-compose.yml"
    [[ -f "$workspace_root/infra/platform/docker-compose.channels.yml" ]] && rollback_channels="$workspace_root/infra/platform/docker-compose.channels.yml"
    [[ -f "$workspace_root/infra/zitadel/docker-compose.yml" ]] && rollback_zitadel="$workspace_root/infra/zitadel/docker-compose.yml"
    if [[ -n "$old_mercur_image" ]]; then
      MERCUR_IMAGE="$old_mercur_image" MERCUR_ENV_FILE="$mercur_env" \
        docker compose --env-file "$platform_env" -f "$rollback_compose" up -d mercur-api mercur-worker
    else
      docker rm -f ffax-platform-mercur-worker-1 ffax-platform-mercur-api-1 >/dev/null 2>&1 || true
    fi
    if [[ -n "$old_ffax_api_image" ]]; then
      FFAX_API_IMAGE="$old_ffax_api_image" FFAX_API_ENV_FILE="$ffax_api_env" \
        docker compose --env-file "$zitadel_env" -f "$rollback_zitadel" --profile production up -d ffax-api
    else
      docker rm -f ffax-zitadel-ffax-api-1 >/dev/null 2>&1 || true
    fi
    if [[ -n "$old_channel_image" ]]; then
      FFAX_CHANNEL_IMAGE="$old_channel_image" \
        docker compose --env-file "$channels_env" -f "$rollback_channels" up -d \
          warehouse-api warehouse-worker warehouse-gateway \
          marketplace-channel-api marketplace-worker marketplace-gateway \
          logistics-api logistics-worker logistics-gateway \
          commerce-api commerce-worker commerce-gateway sync-api
    else
      FFAX_CHANNEL_IMAGE="$channel_image" \
        docker compose --env-file "$channels_env" -f "$rollback_channels" stop \
          warehouse-api warehouse-worker warehouse-gateway \
          marketplace-channel-api marketplace-worker marketplace-gateway \
          logistics-api logistics-worker logistics-gateway \
          commerce-api commerce-worker commerce-gateway sync-api
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

install -d -m 0700 "$platform_secret_root" "$backup_root"
rm -rf -- "$next_workspace"
mkdir -p "$next_workspace"
tar -xzf "$archive" -C "$next_workspace"
forbidden_artifact="$(find "$next_workspace" -type f \( -name '.DS_Store' -o -name '*.log' -o -name '*.bak' -o -name '*.old' -o -name '*.orig' -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.zip' -o -name '*.7z' \) -print -quit)"
if [[ -n "$forbidden_artifact" ]]; then
  echo "Forbidden backup, log or editor artifact remains in the production archive: ${forbidden_artifact}" >&2
  exit 1
fi
test -f "$next_workspace/dist/index.html"
test -f "$next_workspace/server/Dockerfile"
test -f "$next_workspace/services/mercur-core/Dockerfile"
test -f "$next_workspace/infra/platform/docker-compose.yml"
test -f "$next_workspace/infra/platform/docker-compose.channels.yml"
test -f "$next_workspace/infra/secrets/docker-compose.yml"
test -f "$next_workspace/infra/secrets/bootstrap-openbao.sh"
test -f "$next_workspace/infra/observability/docker-compose.yml"
test -f "$next_workspace/infra/zitadel/docker-compose.yml"
test -f "$next_workspace/deploy/nginx/ffax.com.conf"
test -f "$next_workspace/scripts/api-reporting/check.mjs"
test -f "$next_workspace/docs/api-integrations/latest.json"

validate_frontend_bundle "$next_workspace/dist" "/workbench/" 200
validate_frontend_bundle "$next_workspace/dist-root" "/" 20

FFAX_API_REPORT_REQUIRE_DESKTOP=false \
  node "$next_workspace/scripts/api-reporting/check.mjs" \
  --root "$next_workspace" \
  --no-desktop

if [[ ! -f "$zitadel_env" ]]; then
  if [[ -f "$workspace_root/infra/zitadel/.env.production" ]]; then
    install -m 0600 "$workspace_root/infra/zitadel/.env.production" "$zitadel_env"
  elif [[ -f "/opt/ffax/workspace/infra/zitadel/.env.production" ]]; then
    install -m 0600 "/opt/ffax/workspace/infra/zitadel/.env.production" "$zitadel_env"
  elif [[ -f "$workspace_root/infra/zitadel/.env" ]]; then
    install -m 0600 "$workspace_root/infra/zitadel/.env" "$zitadel_env"
  else
    echo "Existing ZITADEL production environment was not found" >&2
    exit 1
  fi
fi
if ! grep -q '^OPENBAO_CONTROL_PLANE_ENV_FILE=' "$zitadel_env"; then
  echo "OPENBAO_CONTROL_PLANE_ENV_FILE=$openbao_app_dir/control-plane.env" >> "$zitadel_env"
fi

if [[ ! -f "$platform_env" ]]; then
  umask 077
  cat > "$platform_env" <<EOF
FFAX_DATABASE_NAME=ffax_platform
FFAX_DATABASE_USER=ffax_platform
FFAX_DATABASE_PASSWORD=$(random_secret 24)
FFAX_REDIS_PASSWORD=$(random_secret 24)
MERCUR_DATABASE_NAME=mercur
MERCUR_DATABASE_USER=mercur
MERCUR_DATABASE_PASSWORD=$(random_secret 24)
MERCUR_IMAGE=$mercur_image
MERCUR_ENV_FILE=$mercur_env
EOF
  chmod 0600 "$platform_env"
fi

if [[ ! -f "$channels_env" ]]; then
  umask 077
  cat > "$channels_env" <<EOF
FFAX_CHANNEL_IMAGE=$channel_image
FFAX_ALLOWED_ORIGINS=https://www.ffax.com
FFAX_INGRESS_SHARED_TOKEN=$(random_secret 32)
FFAX_RUNTIME_HEARTBEAT_TOKEN=$(random_secret 32)
FFAX_CONTROL_PLANE_URL=http://ffax-api:8000
OPENBAO_ENV_DIR=$openbao_app_dir
WAREHOUSE_DATABASE_PASSWORD=$(random_secret 24)
MARKETPLACE_CHANNEL_DATABASE_PASSWORD=$(random_secret 24)
LOGISTICS_DATABASE_PASSWORD=$(random_secret 24)
COMMERCE_DATABASE_PASSWORD=$(random_secret 24)
SYNC_DATABASE_PASSWORD=$(random_secret 24)
ZITADEL_ISSUER=https://www.ffax.com
ZITADEL_PROJECT_ID=
ZITADEL_API_CLIENT_ID=
ZITADEL_API_CLIENT_SECRET=
EOF
  chmod 0600 "$channels_env"
fi
if ! grep -q '^OPENBAO_ENV_DIR=' "$channels_env"; then
  echo "OPENBAO_ENV_DIR=$openbao_app_dir" >> "$channels_env"
fi

old_mercur_image="$(container_image ffax-platform-mercur-api-1)"
old_ffax_api_image="$(container_image ffax-zitadel-ffax-api-1)"
old_channel_image="$(container_image ffax-channels-warehouse-api-1)"

docker network inspect ffax-platform >/dev/null 2>&1 || docker network create ffax-platform >/dev/null
docker network connect ffax-platform ffax-zitadel-zitadel-api-1 >/dev/null 2>&1 || true
bash "$next_workspace/infra/secrets/bootstrap-openbao.sh" \
  "$next_workspace/infra/secrets/docker-compose.yml" \
  "$openbao_operator_file" "$openbao_app_dir"
observability_compose up -d --wait tempo otel-collector
platform_compose up -d --wait platform-db platform-redis mercur-db
channel_compose up -d --wait \
  warehouse-db warehouse-nats \
  marketplace-channel-db marketplace-nats \
  logistics-db logistics-nats \
  commerce-db commerce-nats \
  sync-db sync-nats

set -a
. "$platform_env"
set +a
platform_compose exec -T platform-db pg_dump -U "$FFAX_DATABASE_USER" "$FFAX_DATABASE_NAME" | gzip -9 > "$backup_root/ffax-platform.sql.gz"
platform_compose exec -T mercur-db pg_dump -U "$MERCUR_DATABASE_USER" "$MERCUR_DATABASE_NAME" | gzip -9 > "$backup_root/mercur.sql.gz"
channel_compose exec -T warehouse-db pg_dump -U ffax_channel ffax_warehouse | gzip -9 > "$backup_root/warehouse.sql.gz"
channel_compose exec -T marketplace-channel-db pg_dump -U ffax_channel ffax_marketplace_channel | gzip -9 > "$backup_root/marketplace-channel.sql.gz"
channel_compose exec -T logistics-db pg_dump -U ffax_channel ffax_logistics | gzip -9 > "$backup_root/logistics.sql.gz"
channel_compose exec -T commerce-db pg_dump -U ffax_channel ffax_commerce | gzip -9 > "$backup_root/commerce.sql.gz"
channel_compose exec -T sync-db pg_dump -U ffax_channel ffax_sync | gzip -9 > "$backup_root/sync.sql.gz"
openbao_root_token="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["root_token"])' "$openbao_operator_file")"
openbao_snapshot_name="ffax-${stamp}.snap"
openbao_compose exec -T -e BAO_TOKEN="$openbao_root_token" openbao \
  bao operator raft snapshot save "/openbao/data/${openbao_snapshot_name}"
openbao_volume_path="$(docker volume inspect ffax-secrets_openbao-data --format '{{.Mountpoint}}')"
if [[ "$openbao_volume_path" != /var/lib/docker/volumes/*/_data ]]; then
  echo "Unexpected OpenBao volume path: $openbao_volume_path" >&2
  exit 1
fi
install -m 0600 "${openbao_volume_path}/${openbao_snapshot_name}" "$backup_root/openbao.snap"
rm -f -- "${openbao_volume_path}/${openbao_snapshot_name}"
set -a
. "$zitadel_env"
set +a
docker compose --env-file "$zitadel_env" -f "$next_workspace/infra/zitadel/docker-compose.yml" \
  exec -T postgres pg_dump -U "$POSTGRES_ADMIN_USER" "$POSTGRES_DB" | gzip -9 > "$backup_root/zitadel.sql.gz"

docker build -t "$ffax_api_image" -f "$next_workspace/server/Dockerfile" "$next_workspace"
docker build -t "$channel_image" -f "$next_workspace/server/Dockerfile" "$next_workspace"
docker build -t "$mercur_image" -f "$next_workspace/services/mercur-core/Dockerfile" "$next_workspace/services/mercur-core"

zitadel_compose --profile setup run --rm --no-deps zitadel-provision
generated_server_env="$next_workspace/infra/zitadel/generated/server.env"
test -s "$generated_server_env"
install -m 0600 "$generated_server_env" "$backup_root/zitadel-server.env"

{
  echo "FFAX_CHANNEL_IMAGE=$channel_image"
  echo "FFAX_ALLOWED_ORIGINS=https://www.ffax.com"
  echo "FFAX_INGRESS_SHARED_TOKEN=$(env_value "$channels_env" FFAX_INGRESS_SHARED_TOKEN)"
  echo "FFAX_RUNTIME_HEARTBEAT_TOKEN=$(env_value "$channels_env" FFAX_RUNTIME_HEARTBEAT_TOKEN)"
  echo "FFAX_CONTROL_PLANE_URL=http://ffax-api:8000"
  echo "OPENBAO_ENV_DIR=$openbao_app_dir"
  echo "WAREHOUSE_DATABASE_PASSWORD=$(env_value "$channels_env" WAREHOUSE_DATABASE_PASSWORD)"
  echo "MARKETPLACE_CHANNEL_DATABASE_PASSWORD=$(env_value "$channels_env" MARKETPLACE_CHANNEL_DATABASE_PASSWORD)"
  echo "LOGISTICS_DATABASE_PASSWORD=$(env_value "$channels_env" LOGISTICS_DATABASE_PASSWORD)"
  echo "COMMERCE_DATABASE_PASSWORD=$(env_value "$channels_env" COMMERCE_DATABASE_PASSWORD)"
  echo "SYNC_DATABASE_PASSWORD=$(env_value "$channels_env" SYNC_DATABASE_PASSWORD)"
  echo "ZITADEL_ISSUER=$(env_value "$generated_server_env" ZITADEL_ISSUER)"
  echo "ZITADEL_PROJECT_ID=$(env_value "$generated_server_env" ZITADEL_PROJECT_ID)"
  echo "ZITADEL_API_CLIENT_ID=$(env_value "$generated_server_env" ZITADEL_API_CLIENT_ID)"
  echo "ZITADEL_API_CLIENT_SECRET=$(env_value "$generated_server_env" ZITADEL_API_CLIENT_SECRET)"
} > "${channels_env}.next"
install -m 0600 "${channels_env}.next" "$channels_env"
rm -f -- "${channels_env}.next"

set -a
. "$platform_env"
set +a
{
  cat "$generated_server_env"
  echo "FFAX_DATABASE_URL=postgresql://${FFAX_DATABASE_USER}:${FFAX_DATABASE_PASSWORD}@platform-db:5432/${FFAX_DATABASE_NAME}"
  echo "FFAX_REDIS_URL=redis://:${FFAX_REDIS_PASSWORD}@platform-redis:6379"
  echo "FFAX_SYNC_API_URL=http://sync-api:8300"
  echo "MERCUR_BASE_URL=http://mercur-api:9000"
  echo "FFAX_ENABLE_REAL_PAYMENTS=false"
  echo "FFAX_RUNTIME_HEARTBEAT_TOKEN=$(env_value "$channels_env" FFAX_RUNTIME_HEARTBEAT_TOKEN)"
} > "${ffax_api_env}.next"
install -m 0600 "${ffax_api_env}.next" "$ffax_api_env"
rm -f -- "${ffax_api_env}.next"

existing_jwt=""
existing_cookie=""
if [[ -f "$mercur_env" ]]; then
  existing_jwt="$(env_value "$mercur_env" JWT_SECRET)"
  existing_cookie="$(env_value "$mercur_env" COOKIE_SECRET)"
fi
[[ -n "$existing_jwt" ]] || existing_jwt="$(random_secret 32)"
[[ -n "$existing_cookie" ]] || existing_cookie="$(random_secret 32)"
{
  echo "NODE_ENV=production"
  echo "PORT=9000"
  echo "STORE_CORS=https://www.ffax.com"
  echo "ADMIN_CORS=https://www.ffax.com"
  echo "VENDOR_CORS=https://www.ffax.com"
  echo "AUTH_CORS=https://www.ffax.com"
  echo "JWT_SECRET=$existing_jwt"
  echo "COOKIE_SECRET=$existing_cookie"
  echo "FILE_BACKEND_URL=https://www.ffax.com/marketplace-api/static"
  echo "DISABLE_MEDUSA_ADMIN=true"
  echo "DISABLE_MERCUR_DASHBOARDS=true"
  echo "MEDUSA_DB_MIGRATION_CONNECTION_TIMEOUT=60000"
  echo "ZITADEL_ISSUER=$(env_value "$generated_server_env" ZITADEL_ISSUER)"
  echo "ZITADEL_PROJECT_ID=$(env_value "$generated_server_env" ZITADEL_PROJECT_ID)"
  echo "ZITADEL_API_CLIENT_ID=$(env_value "$generated_server_env" ZITADEL_API_CLIENT_ID)"
  echo "ZITADEL_API_CLIENT_SECRET=$(env_value "$generated_server_env" ZITADEL_API_CLIENT_SECRET)"
  echo "ZITADEL_INTROSPECTION_URL=http://zitadel-api:8080/oauth/v2/introspect"
  echo "ZITADEL_INSTANCE_HOST=www.ffax.com"
} > "${mercur_env}.next"
install -m 0600 "${mercur_env}.next" "$mercur_env"
rm -f -- "${mercur_env}.next"

services_changed=true
migration_complete=false
for migration_attempt in 1 2 3; do
  if platform_compose run --rm mercur-api npm run predeploy; then
    migration_complete=true
    break
  fi
  if [[ "$migration_attempt" -lt 3 ]]; then
    echo "Mercur migration attempt ${migration_attempt} failed; retrying after database recovery"
    sleep 10
  fi
done
if [[ "$migration_complete" != true ]]; then
  echo "Mercur migrations failed after three attempts" >&2
  exit 1
fi
platform_compose up -d --wait mercur-api mercur-worker
zitadel_compose --profile production up -d --wait --no-deps ffax-api
channel_compose up -d --wait \
  warehouse-api warehouse-worker warehouse-gateway \
  marketplace-channel-api marketplace-worker marketplace-gateway \
  logistics-api logistics-worker logistics-gateway \
  commerce-api commerce-worker commerce-gateway \
  sync-api

wait_http http://127.0.0.1:9000/health 30 2
wait_http http://127.0.0.1:8000/api/health 30 2
wait_http http://127.0.0.1:8300/health 30 2
wait_http http://127.0.0.1:9101/health 30 2
wait_http http://127.0.0.1:9102/health 30 2
wait_http http://127.0.0.1:9103/health 30 2
wait_http http://127.0.0.1:9104/health 30 2

cp --archive "$nginx_current" "$nginx_previous"
mv -- "$workspace_root" "$previous_workspace"
mv -- "$next_workspace" "$workspace_root"
install -m 0644 "$workspace_root/deploy/nginx/ffax.com.conf" "$nginx_current"
switched=true
nginx -t
systemctl reload nginx

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
remove_matching_children "/var/backups/ffax" "????????-??????" "$backup_root"
remove_matching_children "/tmp" "ffax-release-*.tar.gz"
remove_matching_children "/tmp" "ffax-images-*.tar"

trap - ERR INT TERM
rm -f -- "$archive"
echo "DEPLOYED:${stamp}"
echo "BACKUP:${backup_root}"
echo "SECRETS:${platform_secret_root}"
