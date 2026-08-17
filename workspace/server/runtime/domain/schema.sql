CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS channel_inbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trace_id text NOT NULL,
  tenant_id text NOT NULL,
  connector_id text NOT NULL,
  external_event_id text NOT NULL,
  event_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  payload jsonb NOT NULL,
  headers jsonb NOT NULL DEFAULT '{}',
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  UNIQUE (connector_id, external_event_id)
);
CREATE INDEX IF NOT EXISTS channel_inbox_pending_idx
  ON channel_inbox (received_at) WHERE processed_at IS NULL;

CREATE TABLE IF NOT EXISTS channel_outbox (
  id bigserial PRIMARY KEY,
  inbox_id uuid NOT NULL REFERENCES channel_inbox(id) ON DELETE CASCADE,
  subject text NOT NULL,
  payload jsonb NOT NULL,
  attempts integer NOT NULL DEFAULT 0,
  available_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (inbox_id, subject)
);
CREATE INDEX IF NOT EXISTS channel_outbox_pending_idx
  ON channel_outbox (available_at, id) WHERE published_at IS NULL;

CREATE TABLE IF NOT EXISTS channel_event (
  id bigserial PRIMARY KEY,
  trace_id text NOT NULL,
  inbox_id uuid NOT NULL UNIQUE REFERENCES channel_inbox(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  connector_id text NOT NULL,
  event_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS channel_entity_version (
  tenant_id text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  version bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, entity_type, entity_id)
);

CREATE TABLE IF NOT EXISTS channel_change (
  sequence bigserial PRIMARY KEY,
  trace_id text NOT NULL,
  tenant_id text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  operation text NOT NULL CHECK (operation IN ('upsert','delete','tombstone')),
  entity_version bigint NOT NULL,
  payload jsonb NOT NULL,
  source_event_id bigint NOT NULL REFERENCES channel_event(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, entity_type, entity_id, entity_version)
);
CREATE INDEX IF NOT EXISTS channel_change_tenant_cursor_idx
  ON channel_change (tenant_id, sequence);

CREATE TABLE IF NOT EXISTS channel_dead_letter (
  id bigserial PRIMARY KEY,
  trace_id text,
  tenant_id text NOT NULL,
  inbox_id uuid,
  subject text NOT NULL,
  payload jsonb NOT NULL,
  error text NOT NULL,
  attempts integer NOT NULL,
  failed_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE channel_inbox ADD COLUMN IF NOT EXISTS trace_id text;
ALTER TABLE channel_event ADD COLUMN IF NOT EXISTS trace_id text;
ALTER TABLE channel_change ADD COLUMN IF NOT EXISTS trace_id text;
ALTER TABLE channel_dead_letter ADD COLUMN IF NOT EXISTS trace_id text;
ALTER TABLE channel_dead_letter ADD COLUMN IF NOT EXISTS tenant_id text;
CREATE INDEX IF NOT EXISTS channel_inbox_trace_idx ON channel_inbox (trace_id);
CREATE INDEX IF NOT EXISTS channel_event_trace_idx ON channel_event (trace_id);
CREATE INDEX IF NOT EXISTS channel_change_trace_idx ON channel_change (trace_id);
CREATE INDEX IF NOT EXISTS channel_dead_letter_trace_idx ON channel_dead_letter (trace_id);
CREATE INDEX IF NOT EXISTS channel_dead_letter_tenant_trace_idx
  ON channel_dead_letter (tenant_id, trace_id);
