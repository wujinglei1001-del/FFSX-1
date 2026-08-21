export const channelCatalog = [
  {
    id: 'warehouse',
    name: '仓储与 WMS',
    description: '海外仓、客户 WMS、库存、库位和入出库事件。',
    gateway: 'warehouse-gateway',
    queue: 'warehouse-nats',
    database: 'warehouse-db',
    runtimeUrl: 'http://warehouse-api:8101',
    syncSubject: 'changes.warehouse',
  },
  {
    id: 'marketplace',
    name: '交易市场',
    description: 'Mercur、需求市场、报价、订单和结算事件。',
    gateway: 'marketplace-gateway',
    queue: 'marketplace-nats',
    database: 'marketplace-db',
    runtimeUrl: 'http://marketplace-channel-api:8102',
    syncSubject: 'changes.marketplace',
  },
  {
    id: 'logistics',
    name: '物流核心',
    description: '承运商报价、出单、标签、轨迹和异常事件。',
    gateway: 'logistics-gateway',
    queue: 'logistics-nats',
    database: 'logistics-db',
    runtimeUrl: 'http://logistics-api:8103',
    syncSubject: 'changes.logistics',
  },
  {
    id: 'commerce',
    name: '电商数据',
    description: '店铺、商品、订单、退款和平台 Webhook。',
    gateway: 'commerce-gateway',
    queue: 'commerce-nats',
    database: 'commerce-db',
    runtimeUrl: 'http://commerce-api:8104',
    syncSubject: 'changes.commerce',
  },
];

export const connectorCatalog = [
  { id: 'warehouse.custom-wms', channelId: 'warehouse', name: '自定义 WMS', authType: 'api-key' },
  { id: 'warehouse.shipbob', channelId: 'warehouse', name: 'ShipBob', authType: 'api-key' },
  { id: 'marketplace.mercur', channelId: 'marketplace', name: 'Mercur', authType: 'oidc' },
  { id: 'marketplace.demands', channelId: 'marketplace', name: 'FFAX 需求市场', authType: 'oidc' },
  { id: 'logistics.ups', channelId: 'logistics', name: 'UPS', authType: 'oauth2' },
  { id: 'logistics.usps', channelId: 'logistics', name: 'USPS', authType: 'oauth2' },
  { id: 'logistics.fedex', channelId: 'logistics', name: 'FedEx', authType: 'oauth2' },
  { id: 'logistics.dhl', channelId: 'logistics', name: 'DHL', authType: 'api-key' },
  { id: 'commerce.amazon', channelId: 'commerce', name: 'Amazon', authType: 'oauth2' },
  { id: 'commerce.shopify', channelId: 'commerce', name: 'Shopify', authType: 'oauth2' },
  {
    id: 'commerce.ebay',
    channelId: 'commerce',
    name: 'eBay',
    authType: 'oauth2',
    capabilities: ['identity', 'orders', 'inventory', 'trading'],
  },
  { id: 'commerce.walmart', channelId: 'commerce', name: 'Walmart', authType: 'oauth2' },
];

const runtimeReadyConnectorIds = new Set(['commerce.ebay']);

export const isConnectorRuntimeReady = (connectorId) =>
  runtimeReadyConnectorIds.has(connectorId);

export const channelById = new Map(channelCatalog.map((channel) => [channel.id, channel]));
export const connectorById = new Map(
  connectorCatalog.map((connector) => [connector.id, connector]),
);

export const publicChannelCatalog = () =>
  channelCatalog.map(({ id, name, description, gateway, queue, database }) => ({
    id,
    name,
    description,
    gateway,
    queue,
    database,
  }));

export const publicConnectorCatalog = () =>
  connectorCatalog.map((connector) => ({
    ...connector,
    runtimeReady: isConnectorRuntimeReady(connector.id),
  }));
