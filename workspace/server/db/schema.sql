CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS ffax_actor (
  user_id text PRIMARY KEY,
  tenant_id text NOT NULL,
  username text,
  email text,
  roles text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ffax_actor_tenant_idx ON ffax_actor (tenant_id);

CREATE TABLE IF NOT EXISTS ffax_category (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text,
  parent_id uuid REFERENCES ffax_category(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL,
  custom_field_schema jsonb NOT NULL DEFAULT '[]',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

CREATE TABLE IF NOT EXISTS ffax_location (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES ffax_location(id) ON DELETE SET NULL,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  level text NOT NULL DEFAULT 'region',
  active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS ffax_tenant_profile (
  tenant_id text PRIMARY KEY,
  display_name text NOT NULL,
  description text NOT NULL DEFAULT '',
  website text,
  verification_status text NOT NULL DEFAULT 'pending',
  metadata jsonb NOT NULL DEFAULT '{}',
  updated_by text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ffax_demand (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  author_id text NOT NULL,
  category_id uuid REFERENCES ffax_category(id) ON DELETE SET NULL,
  location_id uuid REFERENCES ffax_location(id) ON DELETE SET NULL,
  kind text NOT NULL CHECK (kind IN ('buy','sell','service','logistics','warehouse')),
  title text NOT NULL,
  description text NOT NULL,
  custom_fields jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','matched','closed','expired','blocked')),
  promotion_state text NOT NULL DEFAULT 'none' CHECK (promotion_state IN ('none','recommended','featured','promoted')),
  promoted_until timestamptz,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ffax_demand_tenant_status_idx ON ffax_demand (tenant_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS ffax_demand_public_idx ON ffax_demand (status, created_at DESC) WHERE status = 'published';
ALTER TABLE ffax_demand ADD COLUMN IF NOT EXISTS promotion_state text NOT NULL DEFAULT 'none';

CREATE TABLE IF NOT EXISTS ffax_ban (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type text NOT NULL CHECK (target_type IN ('tenant','user')),
  target_id text NOT NULL,
  reason text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  created_by text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_by text,
  revoked_at timestamptz
);
CREATE INDEX IF NOT EXISTS ffax_ban_active_target_idx ON ffax_ban (target_type, target_id, active);

CREATE TABLE IF NOT EXISTS ffax_favorite (
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('demand','tenant','search')),
  target_id text NOT NULL,
  snapshot jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, user_id, target_type, target_id)
);

CREATE TABLE IF NOT EXISTS ffax_offer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id uuid NOT NULL REFERENCES ffax_demand(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  parent_offer_id uuid REFERENCES ffax_offer(id) ON DELETE SET NULL,
  amount numeric(20,4) NOT NULL CHECK (amount >= 0),
  currency char(3) NOT NULL,
  terms text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','countered','accepted','rejected','expired','withdrawn')),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ffax_offer_demand_idx ON ffax_offer (demand_id, created_at DESC);

CREATE TABLE IF NOT EXISTS ffax_conversation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  demand_id uuid REFERENCES ffax_demand(id) ON DELETE SET NULL,
  participant_tenants text[] NOT NULL,
  participant_users text[] NOT NULL,
  created_by text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ffax_conversation_tenants_idx ON ffax_conversation USING gin (participant_tenants);

CREATE TABLE IF NOT EXISTS ffax_message (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES ffax_conversation(id) ON DELETE CASCADE,
  tenant_id text NOT NULL,
  sender_id text NOT NULL,
  body text NOT NULL,
  attachments jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ffax_message_conversation_idx ON ffax_message (conversation_id, created_at);

CREATE TABLE IF NOT EXISTS ffax_conversation_read (
  conversation_id uuid NOT NULL REFERENCES ffax_conversation(id) ON DELETE CASCADE,
  user_id text NOT NULL,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS ffax_notification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  user_id text,
  type text NOT NULL,
  title text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ffax_notification_recipient_idx ON ffax_notification (tenant_id, user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS ffax_review (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  author_id text NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('tenant','user','order','demand')),
  target_id text NOT NULL,
  reference_id text NOT NULL,
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','published','rejected','deleted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, author_id, target_type, target_id, reference_id)
);

CREATE TABLE IF NOT EXISTS ffax_report (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id text NOT NULL,
  reporter_id text NOT NULL,
  target_type text NOT NULL,
  target_id text NOT NULL,
  reason text NOT NULL,
  details text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','reviewing','resolved','dismissed')),
  resolution text,
  reviewed_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ffax_plugin (
  id text PRIMARY KEY,
  name text NOT NULL,
  version text NOT NULL,
  description text NOT NULL DEFAULT '',
  microapp_entry text,
  routes jsonb NOT NULL DEFAULT '[]',
  widgets jsonb NOT NULL DEFAULT '[]',
  capabilities jsonb NOT NULL DEFAULT '[]',
  required_roles text[] NOT NULL DEFAULT '{}',
  permissions text[] NOT NULL DEFAULT '{}',
  price_minor integer NOT NULL DEFAULT 0 CHECK (price_minor >= 0),
  currency char(3) NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available','hidden','retired')),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ffax_tenant_plugin (
  tenant_id text NOT NULL,
  plugin_id text NOT NULL REFERENCES ffax_plugin(id),
  purchase_order_id text,
  installed_version text NOT NULL,
  lifecycle text NOT NULL DEFAULT 'available' CHECK (lifecycle IN ('available','purchased','installing','active','disabled','upgrading','failed')),
  config_version integer NOT NULL DEFAULT 1,
  configuration jsonb NOT NULL DEFAULT '{}',
  licensed_until timestamptz,
  updated_by text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, plugin_id)
);

CREATE TABLE IF NOT EXISTS ffax_dashboard_layout (
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  workspace_id text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  breakpoints jsonb NOT NULL DEFAULT '{}',
  widgets jsonb NOT NULL DEFAULT '[]',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, user_id, workspace_id)
);

CREATE TABLE IF NOT EXISTS ffax_panel_layout (
  tenant_id text NOT NULL,
  user_id text NOT NULL,
  workspace_id text NOT NULL,
  version integer NOT NULL DEFAULT 1,
  resolved_config jsonb NOT NULL DEFAULT '{}',
  panels jsonb NOT NULL DEFAULT '[]',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, user_id, workspace_id)
);

CREATE TABLE IF NOT EXISTS ffax_audit_log (
  id bigserial PRIMARY KEY,
  tenant_id text NOT NULL,
  actor_id text NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  detail jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

DELETE FROM ffax_plugin
WHERE id IN ('ffax.marketplace', 'ffax.community', 'ffax.plugins')
  AND microapp_entry LIKE '/workbench/microapps/%';

CREATE TABLE IF NOT EXISTS ffax_channel_definition (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  gateway_service text NOT NULL,
  queue_service text NOT NULL,
  database_service text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ffax_connector_definition (
  id text PRIMARY KEY,
  channel_id text NOT NULL REFERENCES ffax_channel_definition(id),
  name text NOT NULL,
  auth_type text NOT NULL,
  capabilities jsonb NOT NULL DEFAULT '[]',
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ffax_tenant_connector (
  tenant_id text NOT NULL,
  connector_id text NOT NULL REFERENCES ffax_connector_definition(id),
  channel_id text NOT NULL REFERENCES ffax_channel_definition(id),
  enabled boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available','configured','disabled','degraded','failed')),
  settings jsonb NOT NULL DEFAULT '{}',
  credential_ref text,
  config_version integer NOT NULL DEFAULT 1,
  updated_by text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, connector_id)
);
CREATE INDEX IF NOT EXISTS ffax_tenant_connector_channel_idx
  ON ffax_tenant_connector (tenant_id, channel_id, enabled);

CREATE TABLE IF NOT EXISTS ffax_channel_instance (
  channel_id text NOT NULL REFERENCES ffax_channel_definition(id),
  instance_id text NOT NULL,
  status text NOT NULL DEFAULT 'healthy' CHECK (status IN ('healthy','degraded','isolated','offline')),
  detail jsonb NOT NULL DEFAULT '{}',
  heartbeat_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (channel_id, instance_id)
);
CREATE INDEX IF NOT EXISTS ffax_channel_instance_heartbeat_idx
  ON ffax_channel_instance (channel_id, heartbeat_at DESC);

INSERT INTO ffax_channel_definition
  (id,name,description,gateway_service,queue_service,database_service)
VALUES
  ('warehouse','仓储与 WMS','海外仓、客户 WMS、库存、库位和入出库事件','warehouse-gateway','warehouse-nats','warehouse-db'),
  ('marketplace','交易市场','Mercur、需求市场、报价、订单和结算事件','marketplace-gateway','marketplace-nats','marketplace-db'),
  ('logistics','物流核心','承运商报价、出单、标签、轨迹和异常事件','logistics-gateway','logistics-nats','logistics-db'),
  ('commerce','电商数据','店铺、商品、订单、退款和平台 Webhook','commerce-gateway','commerce-nats','commerce-db')
ON CONFLICT (id) DO UPDATE SET
  name=EXCLUDED.name,
  description=EXCLUDED.description,
  gateway_service=EXCLUDED.gateway_service,
  queue_service=EXCLUDED.queue_service,
  database_service=EXCLUDED.database_service,
  updated_at=now();

INSERT INTO ffax_connector_definition (id,channel_id,name,auth_type,capabilities)
VALUES
  ('warehouse.custom-wms','warehouse','自定义 WMS','api-key','["inventory.read","inventory.write","fulfillment.read"]'),
  ('warehouse.shipbob','warehouse','ShipBob','api-key','["inventory.read","fulfillment.read","fulfillment.write"]'),
  ('marketplace.mercur','marketplace','Mercur','oidc','["catalog","orders","fulfillment","settlement"]'),
  ('marketplace.demands','marketplace','FFAX 需求市场','oidc','["demands","offers","messaging","reviews"]'),
  ('logistics.ups','logistics','UPS','oauth2','["rate.quote","shipment.create","label.create","tracking.read"]'),
  ('logistics.usps','logistics','USPS','oauth2','["rate.quote","shipment.create","label.create","tracking.read"]'),
  ('logistics.fedex','logistics','FedEx','oauth2','["rate.quote","shipment.create","label.create","tracking.read"]'),
  ('logistics.dhl','logistics','DHL','api-key','["rate.quote","shipment.create","label.create","tracking.read"]'),
  ('commerce.amazon','commerce','Amazon','oauth2','["stores","products","orders","refunds"]'),
  ('commerce.shopify','commerce','Shopify','oauth2','["stores","products","orders","refunds"]'),
  ('commerce.ebay','commerce','eBay','oauth2','["stores","products","orders","refunds"]'),
  ('commerce.walmart','commerce','Walmart','oauth2','["stores","products","orders","refunds"]')
ON CONFLICT (id) DO UPDATE SET
  channel_id=EXCLUDED.channel_id,
  name=EXCLUDED.name,
  auth_type=EXCLUDED.auth_type,
  capabilities=EXCLUDED.capabilities,
  updated_at=now();
