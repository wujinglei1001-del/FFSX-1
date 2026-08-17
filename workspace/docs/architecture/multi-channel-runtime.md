# FFAX multi-channel runtime

## Open-source infrastructure

- APISIX is the independent ingress gateway for each business channel.
- NATS JetStream is the persistent queue, retry buffer and consumer boundary.
- PostgreSQL is isolated per channel and for device synchronization.
- OpenBao stores connector credentials; FFAX databases only store `openbao://` references.
- OpenTelemetry Collector and Tempo retain distributed traces.
- Karrio open-source core and community plugins run as single-tenant logistics cells.
- Mercur remains the marketplace transaction engine.

Karrio's enterprise multi-tenancy code is not copied or used. A shared open-source
Karrio database is not a valid FFAX tenant boundary, so each provisioned logistics
cell receives an independent database, Redis volume, secret and plugin directory.

## FFAX-specific code

FFAX owns the control plane, tenant authorization, connector catalog, runtime
heartbeats, business event envelopes, outbox/inbox guarantees, dead-letter
metadata, trace correlation, device synchronization and conflict handling. These
parts encode FFAX tenant and trade-domain rules and are intentionally not delegated
to a generic third-party system.

## Failure boundaries

Warehouse, marketplace, logistics and commerce have different gateways, queues,
workers and databases. A blocked carrier API cannot consume commerce or marketplace
workers. Device synchronization has its own queue and database and never performs
direct writes from an offline device into a domain database.

The control plane does not proxy orders, labels, inventory or tracking events. It
stores authorization and configuration only. Each API and worker reports its own
heartbeat. A channel is healthy only while both runtime roles remain current.

## Credential boundary

The browser submits a credential once over an authenticated tenant-admin request.
The control plane writes it to OpenBao and returns only a version. Channel AppRoles
can read only their own tenant connector paths. Secret values must never be placed
in connector settings, browser storage, Git, Compose files or deployment reports.

