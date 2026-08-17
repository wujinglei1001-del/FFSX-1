CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS sync_device (
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  device_id text NOT NULL,
  platform text NOT NULL,
  device_name text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}',
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id,user_id,device_id)
);

CREATE TABLE IF NOT EXISTS sync_change (
  sequence bigserial PRIMARY KEY,
  trace_id text NOT NULL,
  tenant_id text NOT NULL,
  channel_id text NOT NULL,
  source_sequence bigint NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  operation text NOT NULL CHECK (operation IN ('upsert','delete','tombstone')),
  entity_version bigint NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (channel_id,source_sequence)
);
CREATE INDEX IF NOT EXISTS sync_change_tenant_cursor_idx ON sync_change (tenant_id,sequence);

CREATE TABLE IF NOT EXISTS sync_checkpoint (
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  device_id text NOT NULL,
  cursor bigint NOT NULL DEFAULT 0,
  acknowledged_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id,user_id,device_id),
  FOREIGN KEY (tenant_id,user_id,device_id)
    REFERENCES sync_device(tenant_id,user_id,device_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sync_client_outbox (
  id bigserial PRIMARY KEY,
  trace_id text NOT NULL,
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  device_id text NOT NULL,
  operation_id text NOT NULL,
  channel_id text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  operation text NOT NULL DEFAULT 'upsert' CHECK (operation IN ('upsert','delete')),
  base_version bigint NOT NULL DEFAULT 0,
  server_version bigint,
  mutation jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','dispatching','applied','conflict','failed')),
  conflict jsonb,
  attempts integer NOT NULL DEFAULT 0,
  available_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id,device_id,operation_id)
);
CREATE INDEX IF NOT EXISTS sync_outbox_dispatch_idx
  ON sync_client_outbox (channel_id,status,available_at,id);

ALTER TABLE sync_change ADD COLUMN IF NOT EXISTS trace_id text;
ALTER TABLE sync_client_outbox ADD COLUMN IF NOT EXISTS trace_id text;
CREATE INDEX IF NOT EXISTS sync_change_trace_idx ON sync_change (trace_id);
CREATE INDEX IF NOT EXISTS sync_outbox_trace_idx ON sync_client_outbox (trace_id);
