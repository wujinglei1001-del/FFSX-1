# FFAX API authentication bridge

This server is the FFAX-owned API boundary. It does not modify ZITADEL. It validates every protected request by calling the official ZITADEL OAuth 2.0 token introspection endpoint with server-side API application credentials.

## ZITADEL configuration

The one-step ZITADEL setup writes the real API application credentials directly to the ignored `server/.env` file:

```powershell
npm run auth:setup
```

The API Client Secret is never written to browser configuration and never uses a `VITE_` prefix. `server/.env.example` remains a manual configuration reference.

The frontend requests the ZITADEL audience scope:

```text
urn:zitadel:iam:org:project:id:<PROJECT_ID>:aud
```

The API checks token activity, issuer, audience, organization, and project roles. Add business routes before the final `/api` protection boundary in `server/index.js`, using `requireZitadelAuth` and `requireRoles(...)` as needed.
