# FFAX

FFAX consists of three independently deployed parts:

- React 19 + Vite frontend in this repository root.
- FFAX-owned API in `server/`, listening on port `8000` by default.
- Official, unmodified ZITADEL identity services in `infra/zitadel/`.

The browser uses Authorization Code with PKCE and never receives a client secret. The FFAX API validates Bearer tokens through ZITADEL's OAuth 2.0 token introspection endpoint and enforces issuer, audience, organization, and project-role boundaries.

Configuration templates:

- Frontend: `.env.example` to `.env.local`
- FFAX API: `server/.env.example` to `server/.env`
- ZITADEL deployment: `infra/zitadel/.env.example` to `infra/zitadel/.env`

The complete local identity setup is automated:

```powershell
npm run auth:setup
```

This creates the FFAX ZITADEL project, roles, Web client, API client, and the ignored frontend/server environment files. Deployment details are documented in `infra/zitadel/README.md` and `server/README.md`.
