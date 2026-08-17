#!/usr/bin/env bash
set -Eeuo pipefail

compose_file="${1:?compose file is required}"
operator_file="${2:?operator file is required}"
app_secret_dir="${3:?application secret directory is required}"

compose() {
  docker compose -f "$compose_file" "$@"
}

json_value() {
  local file="$1"
  local expression="$2"
  python3 - "$file" "$expression" <<'PY'
import json
import sys

value = json.load(open(sys.argv[1], encoding="utf-8"))
for part in sys.argv[2].split("."):
    if part.isdigit():
        value = value[int(part)]
    else:
        value = value[part]
print(value)
PY
}

install -d -m 0700 "$(dirname "$operator_file")" "$app_secret_dir"
compose up -d openbao

for attempt in $(seq 1 60); do
  status_json="$(compose exec -T openbao bao status -format=json 2>/dev/null || true)"
  if [[ -n "$status_json" ]]; then
    break
  fi
  sleep 2
done

if [[ ! -f "$operator_file" ]]; then
  umask 077
  compose exec -T openbao bao operator init \
    -key-shares=5 -key-threshold=3 -format=json > "$operator_file"
  chmod 0600 "$operator_file"
fi

for index in 0 1 2; do
  key="$(json_value "$operator_file" "unseal_keys_b64.${index}")"
  compose exec -T openbao bao operator unseal "$key" >/dev/null
done

root_token="$(json_value "$operator_file" root_token)"
bao() {
  compose exec -T -e BAO_TOKEN="$root_token" openbao bao "$@"
}

bao secrets list -format=json | grep -q '"secret/"' || bao secrets enable -path=secret kv-v2 >/dev/null
bao auth list -format=json | grep -q '"approle/"' || bao auth enable approle >/dev/null

for channel in warehouse marketplace logistics commerce; do
  policy_file="$(mktemp)"
  cat > "$policy_file" <<EOF
path "secret/data/tenants/+/connectors/${channel}/*" {
  capabilities = ["read"]
}
path "secret/metadata/tenants/+/connectors/${channel}/*" {
  capabilities = ["read", "list"]
}
EOF
  bao policy write "ffax-${channel}-runtime" - < "$policy_file" >/dev/null
  rm -f -- "$policy_file"
  bao write "auth/approle/role/ffax-${channel}-runtime" \
    "token_policies=ffax-${channel}-runtime" \
    token_ttl=1h token_max_ttl=4h secret_id_ttl=0 secret_id_num_uses=0 >/dev/null
  role_id="$(bao read -field=role_id "auth/approle/role/ffax-${channel}-runtime/role-id")"
  secret_id="$(bao write -f -field=secret_id "auth/approle/role/ffax-${channel}-runtime/secret-id")"
  umask 077
  cat > "${app_secret_dir}/${channel}.env" <<EOF
OPENBAO_ADDR=http://openbao:8200
OPENBAO_ROLE_ID=${role_id}
OPENBAO_SECRET_ID=${secret_id}
EOF
  chmod 0600 "${app_secret_dir}/${channel}.env"
done

control_policy="$(mktemp)"
cat > "$control_policy" <<'EOF'
path "secret/data/tenants/*" {
  capabilities = ["create", "update"]
}
path "secret/metadata/tenants/*" {
  capabilities = ["read", "list"]
}
EOF
bao policy write ffax-control-plane-secrets - < "$control_policy" >/dev/null
rm -f -- "$control_policy"
bao write auth/approle/role/ffax-control-plane-secrets \
  token_policies=ffax-control-plane-secrets \
  token_ttl=30m token_max_ttl=2h secret_id_ttl=0 secret_id_num_uses=0 >/dev/null
control_role_id="$(bao read -field=role_id auth/approle/role/ffax-control-plane-secrets/role-id)"
control_secret_id="$(bao write -f -field=secret_id auth/approle/role/ffax-control-plane-secrets/secret-id)"
umask 077
cat > "${app_secret_dir}/control-plane.env" <<EOF
OPENBAO_ADDR=http://openbao:8200
OPENBAO_ROLE_ID=${control_role_id}
OPENBAO_SECRET_ID=${control_secret_id}
EOF
chmod 0600 "${app_secret_dir}/control-plane.env"

echo "OPENBAO_READY:${operator_file}"
