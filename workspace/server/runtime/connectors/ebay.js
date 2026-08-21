import crypto from 'node:crypto';
import express from 'express';

import { getConnectorRuntimeConfig } from '../shared/control-plane.js';
import { readConnectorCredential } from '../shared/openbao.js';

const connectorId = 'commerce.ebay';
const channelId = 'commerce';
const sandboxApiUrl = 'https://api.sandbox.ebay.com';
const sandboxIdentityUrl = 'https://apiz.sandbox.ebay.com';
const sandboxTokenUrl = `${sandboxApiUrl}/identity/v1/oauth2/token`;
const sandboxTradingUrl = `${sandboxApiUrl}/ws/api.dll`;

const requiredText = (value, name, max = 500) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    const error = new Error(`invalid_${name}`);
    error.status = 400;
    throw error;
  }
  return value.trim();
};

const parseJson = async (response) => {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 1000) };
  }
};

const externalError = (prefix, response, body) => {
  const error = new Error(`${prefix}:${response.status}`);
  error.status = response.status >= 400 && response.status < 500 ? 424 : 502;
  error.externalStatus = response.status;
  error.externalResponse = body;
  return error;
};

const getAccessToken = async (credential) => {
  const clientId = requiredText(credential.clientId, 'ebay_client_id', 500);
  const clientSecret = requiredText(credential.clientSecret, 'ebay_client_secret', 1000);
  const refreshToken = requiredText(credential.refreshToken, 'ebay_refresh_token', 5000);
  const form = new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken });
  if (Array.isArray(credential.scopes) && credential.scopes.length) {
    form.set('scope', credential.scopes.join(' '));
  }
  const response = await fetch(sandboxTokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
    signal: AbortSignal.timeout(15000),
  });
  const body = await parseJson(response);
  if (!response.ok || !body.access_token) throw externalError('ebay_token_failed', response, body);
  return body.access_token;
};

const ebayGet = async ({ accessToken, path, identity = false }) => {
  const response = await fetch(`${identity ? sandboxIdentityUrl : sandboxApiUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Accept-Language': 'en-US',
    },
    signal: AbortSignal.timeout(30000),
  });
  const body = await parseJson(response);
  if (!response.ok) throw externalError('ebay_api_failed', response, body);
  return body;
};

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const xmlValue = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}(?: [^>]*)?>([\\s\\S]*?)</${tag}>`));
  return match
    ? match[1]
        .replace(/<!\[CDATA\[|\]\]>/g, '')
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&apos;', "'")
    : null;
};

const tradingOrders = async ({ accessToken, days = 30 }) => {
  const end = new Date();
  const start = new Date(end.getTime() - days * 86400000);
  const request = `<?xml version="1.0" encoding="utf-8"?>
<GetOrdersRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>${escapeXml(accessToken)}</eBayAuthToken></RequesterCredentials>
  <CreateTimeFrom>${start.toISOString()}</CreateTimeFrom>
  <CreateTimeTo>${end.toISOString()}</CreateTimeTo>
  <OrderRole>Seller</OrderRole>
  <OrderStatus>All</OrderStatus>
  <DetailLevel>ReturnAll</DetailLevel>
</GetOrdersRequest>`;
  const response = await fetch(sandboxTradingUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'X-EBAY-API-CALL-NAME': 'GetOrders',
      'X-EBAY-API-SITEID': '0',
      'X-EBAY-API-COMPATIBILITY-LEVEL': '1357',
    },
    body: request,
    signal: AbortSignal.timeout(30000),
  });
  const xml = await response.text();
  if (!response.ok || !['Success', 'Warning'].includes(xmlValue(xml, 'Ack'))) {
    throw externalError('ebay_trading_failed', response, {
      ack: xmlValue(xml, 'Ack'),
      errorCode: xmlValue(xml, 'ErrorCode'),
      message: xmlValue(xml, 'LongMessage'),
    });
  }
  return [...xml.matchAll(/<Order>([\s\S]*?)<\/Order>/g)].map((match) => {
    const order = match[1];
    const amountMatch = order.match(/<AmountPaid(?: currencyID="([^"]+)")?>([^<]+)<\/AmountPaid>/);
    return {
      sourceSystem: 'ebay',
      sourceMarketplace: 'EBAY_US',
      sourceOrderId: xmlValue(order, 'OrderID'),
      createdAt: xmlValue(order, 'CreatedTime'),
      updatedAt: xmlValue(order, 'CheckoutStatusLastModifiedTime'),
      orderStatus: xmlValue(order, 'OrderStatus'),
      paymentStatus: xmlValue(order, 'eBayPaymentStatus'),
      paidAt: xmlValue(order, 'PaidTime'),
      amountPaid: amountMatch?.[2] || '0',
      currency: amountMatch?.[1] || 'USD',
      item: {
        sourceItemId: xmlValue(order, 'ItemID'),
        sourceTransactionId: xmlValue(order, 'TransactionID'),
        sku: xmlValue(order, 'SKU'),
        title: xmlValue(order, 'Title'),
        quantity: Number(xmlValue(order, 'QuantityPurchased') || 0),
      },
    };
  });
};

const connectorContext = async (req) => {
  const tenantId = requiredText(req.headers['x-ffax-tenant-id'], 'tenant_id', 200);
  const config = await getConnectorRuntimeConfig({ channelId, tenantId, connectorId });
  if (!config.enabled) {
    const error = new Error('ebay_connector_disabled');
    error.status = 409;
    throw error;
  }
  if (config.settings?.environment !== 'sandbox') {
    const error = new Error('ebay_connector_requires_sandbox');
    error.status = 409;
    throw error;
  }
  if (!config.credential_ref) {
    const error = new Error('ebay_credential_not_configured');
    error.status = 409;
    throw error;
  }
  const credential = await readConnectorCredential({
    reference: config.credential_ref,
    channelId,
    tenantId,
  });
  return {
    tenantId,
    config,
    accessToken: await getAccessToken(credential),
  };
};

const appendChanges = async ({ database, tenantId, traceId, entities }) =>
  database.transaction(async (client) => {
    let accepted = 0;
    let duplicates = 0;
    for (const entity of entities) {
      const versionKey = crypto
        .createHash('sha256')
        .update(JSON.stringify(entity.payload))
        .digest('hex')
        .slice(0, 24);
      const externalEventId = `${tenantId}:${entity.entityType}:${entity.entityId}:${versionKey}`;
      const inserted = await client.query(
        `INSERT INTO channel_inbox
          (trace_id,tenant_id,connector_id,external_event_id,event_type,entity_type,entity_id,payload,headers)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (connector_id,external_event_id) DO NOTHING RETURNING *`,
        [
          traceId,
          tenantId,
          connectorId,
          externalEventId,
          entity.eventType,
          entity.entityType,
          entity.entityId,
          entity.payload,
          { source: 'ebay-sandbox-pull' },
        ],
      );
      if (!inserted.rows[0]) {
        duplicates += 1;
        continue;
      }
      const envelope = {
        channelId,
        traceId,
        inboxId: inserted.rows[0].id,
        tenantId,
        connectorId,
        externalEventId,
        eventType: entity.eventType,
        entityType: entity.entityType,
        entityId: entity.entityId,
        operation: 'upsert',
        payload: entity.payload,
        receivedAt: inserted.rows[0].received_at,
      };
      await client.query(
        'INSERT INTO channel_outbox (inbox_id,subject,payload) VALUES ($1,$2,$3)',
        [inserted.rows[0].id, `${channelId}.ingress.${connectorId}`, envelope],
      );
      accepted += 1;
    }
    return { accepted, duplicates, total: entities.length };
  });

export const createEbayRouter = ({ database }) => {
  const router = express.Router();

  router.get('/status', async (req, res) => {
    const context = await connectorContext(req);
    const identity = await ebayGet({
      accessToken: context.accessToken,
      path: '/commerce/identity/v1/user/',
      identity: true,
    });
    res.json({
      data: {
        connectorId,
        environment: 'sandbox',
        ready: true,
        accountType: identity.accountType || null,
        marketplaceId: context.config.settings?.marketplaceId || 'EBAY_US',
      },
    });
  });

  router.get('/identity', async (req, res) => {
    const context = await connectorContext(req);
    const identity = await ebayGet({
      accessToken: context.accessToken,
      path: '/commerce/identity/v1/user/',
      identity: true,
    });
    res.json({ data: identity });
  });

  router.get('/orders', async (req, res) => {
    const context = await connectorContext(req);
    const days = Math.min(Math.max(Number(req.query.days) || 30, 1), 90);
    res.json({ data: { orders: await tradingOrders({ accessToken: context.accessToken, days }) } });
  });

  router.get('/inventory/locations', async (req, res) => {
    const context = await connectorContext(req);
    const data = await ebayGet({
      accessToken: context.accessToken,
      path: '/sell/inventory/v1/location?limit=100',
    });
    res.json({ data });
  });

  router.get('/inventory/items', async (req, res) => {
    const context = await connectorContext(req);
    const data = await ebayGet({
      accessToken: context.accessToken,
      path: '/sell/inventory/v1/inventory_item?limit=100',
    });
    res.json({ data });
  });

  router.post('/sync', async (req, res) => {
    const context = await connectorContext(req);
    const traceId = requiredText(
      req.headers['x-ffax-trace-id'] || crypto.randomUUID().replaceAll('-', ''),
      'trace_id',
      128,
    );
    const [orders, inventory] = await Promise.all([
      tradingOrders({ accessToken: context.accessToken, days: 30 }),
      ebayGet({
        accessToken: context.accessToken,
        path: '/sell/inventory/v1/inventory_item?limit=100',
      }),
    ]);
    const entities = [
      ...orders
        .filter((order) => order.sourceOrderId)
        .map((order) => ({
          eventType: 'commerce.order.upsert',
          entityType: 'commerce_order',
          entityId: order.sourceOrderId,
          payload: order,
        })),
      ...(inventory.inventoryItems || [])
        .filter((item) => item.sku)
        .map((item) => ({
          eventType: 'commerce.inventory.upsert',
          entityType: 'inventory_item',
          entityId: item.sku,
          payload: { sourceSystem: 'ebay', sourceMarketplace: 'EBAY_US', ...item },
        })),
    ];
    const result = await appendChanges({
      database,
      tenantId: context.tenantId,
      traceId,
      entities,
    });
    res.setHeader('X-FFAX-Trace-Id', traceId);
    res.status(202).json({ data: { ...result, traceId } });
  });

  return router;
};
