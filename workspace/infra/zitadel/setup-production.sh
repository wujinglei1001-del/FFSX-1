#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WORKSPACE_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)
ENV_FILE="$SCRIPT_DIR/.env.production"
COMPOSE_FILE="$SCRIPT_DIR/docker-compose.yml"

merge_env_file() {
  source_file=$1
  destination_file=$2

  if [ ! -f "$destination_file" ]; then
    install -m 600 "$source_file" "$destination_file"
    return
  fi

  temporary_file=$(mktemp "${destination_file}.XXXXXX")
  awk '
    NR == FNR {
      if ($0 !~ /^[[:space:]]*#/ && index($0, "=") > 1) {
        key = $0
        sub(/=.*/, "", key)
        values[key] = substr($0, index($0, "=") + 1)
        order[++count] = key
      }
      next
    }
    {
      if ($0 !~ /^[[:space:]]*#/ && index($0, "=") > 1) {
        key = $0
        sub(/=.*/, "", key)
        if (key in values) {
          print key "=" values[key]
          written[key] = 1
          next
        }
      }
      print
    }
    END {
      for (i = 1; i <= count; i += 1) {
        key = order[i]
        if (!(key in written)) print key "=" values[key]
      }
    }
  ' "$source_file" "$destination_file" > "$temporary_file"
  install -m 600 "$temporary_file" "$destination_file"
  rm -f -- "$temporary_file"
}

if [ ! -f "$ENV_FILE" ]; then
  umask 077
  master_key=$(openssl rand -hex 16)
  admin_password="Aa1!$(openssl rand -hex 14)"
  postgres_password=$(openssl rand -hex 24)

  {
    echo "ZITADEL_DOMAIN=www.ffax.com"
    echo "PROXY_HTTP_PUBLISHED_PORT=127.0.0.1:8080"
    echo "ZITADEL_EXTERNALPORT=443"
    echo "ZITADEL_EXTERNALSECURE=true"
    echo "ZITADEL_PUBLIC_SCHEME=https"
    echo "ZITADEL_PUBLIC_URL=https://www.ffax.com"
    echo "ZITADEL_INSTANCE_HOST=www.ffax.com"
    echo "ZITADEL_MASTERKEY=$master_key"
    echo "LOGIN_CLIENT_PAT_EXPIRATION=2099-01-01T00:00:00Z"
    echo "ADMIN_PAT_EXPIRATION=2099-01-01T00:00:00Z"
    echo "ZITADEL_FIRSTINSTANCE_ORG_NAME=FFAX"
    echo "ZITADEL_ADMIN_USERNAME=mamawel"
    echo "ZITADEL_ADMIN_PASSWORD=$admin_password"
    echo "ZITADEL_ADMIN_EMAIL=admin@ffax.com"
    echo "ZITADEL_SMTP_HOST="
    echo "ZITADEL_SMTP_USER="
    echo "ZITADEL_SMTP_PASSWORD="
    echo "ZITADEL_SMTP_TLS=false"
    echo "ZITADEL_SMTP_FROM="
    echo "ZITADEL_SMTP_FROM_NAME=FFAX"
    echo "ZITADEL_SMTP_REPLY_TO="
    echo "FFAX_FRONTEND_URL=https://www.ffax.com/workbench"
    echo "FFAX_CALLBACK_URL=https://www.ffax.com/workbench/authentication/callback"
    echo "FFAX_POST_LOGOUT_URL=https://www.ffax.com/workbench/authentication/zitadel/logged-out"
    echo "FFAX_API_URL=https://www.ffax.com/workbench-api"
    echo "FFAX_DEV_MODE=false"
    echo "ZITADEL_VERSION=v4.15.0"
    echo "TRAEFIK_IMAGE=traefik:v3.6.8"
    echo "POSTGRES_IMAGE=postgres:17.2-alpine"
    echo "TRAEFIK_DASHBOARD_ENABLED=false"
    echo "TRAEFIK_LOG_LEVEL=INFO"
    echo "TRAEFIK_ACCESSLOG_ENABLED=true"
    echo "POSTGRES_DB=zitadel"
    echo "POSTGRES_ADMIN_USER=postgres"
    echo "POSTGRES_ADMIN_PASSWORD=$postgres_password"
    echo "ZITADEL_DATABASE_POSTGRES_DSN=postgresql://postgres:$postgres_password@postgres:5432/zitadel?sslmode=disable"
    echo "ZITADEL_ACCESS_LOG_STDOUT_ENABLED=true"
  } > "$ENV_FILE"
fi

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --wait
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" --profile setup run --rm zitadel-provision

merge_env_file "$SCRIPT_DIR/generated/frontend.env.local" "$WORKSPACE_DIR/.env.production"
merge_env_file "$SCRIPT_DIR/generated/server.env" "$WORKSPACE_DIR/server/.env"

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" --profile production up -d --wait ffax-api

attempt=1
while ! curl --fail --silent --show-error --max-time 10 http://127.0.0.1:8000/api/health >/dev/null 2>&1; do
  if [ "$attempt" -ge 30 ]; then
    echo "FFAX API health check did not become ready." >&2
    exit 1
  fi
  attempt=$((attempt + 1))
  sleep 2
done

echo "FFAX production authentication and API services are ready."
echo "Frontend environment: $WORKSPACE_DIR/.env.production"
echo "Administrator credentials: $ENV_FILE"
