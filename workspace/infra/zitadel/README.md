# FFAX ZITADEL authentication

This directory deploys the official, unmodified ZITADEL API and Login V2 images as an independent service. FFAX connects through standard OpenID Connect and API boundaries. `ZITADEL_SERVICEPING_ENABLED=false` is set in `docker-compose.yml`.

No ZITADEL source code is copied into or modified by FFAX. Keep the ZITADEL deployment, database, upgrades, and backups operationally separate from the FFAX application.

## One-step local setup

Run this command from `E:\FAA\workspace` when service startup is authorized:

```powershell
npm run auth:setup
```

The setup script:

1. Creates the ignored `infra/zitadel/.env` file with locally generated secrets.
2. Starts the pinned official ZITADEL, Login V2, PostgreSQL, and Traefik containers.
3. Creates the `FFAX` project and the `admin`, `operator`, `member`, and `viewer` roles.
4. Creates a PKCE Web application and a Basic-auth API application.
5. Writes public browser configuration to the ignored root `.env.local` file.
6. Writes the API Client ID and Client Secret only to the ignored `server/.env` file.

For the local defaults, ZITADEL is exposed at `http://localhost:8080`. The first administrator is `mamawel`; its generated password is stored only in `infra/zitadel/.env` and must be changed on first login.

The existing FFAX login and registration routes redirect to the official ZITADEL Login V2 interface. Registration uses the supported OIDC `prompt=create` parameter. Access tokens are kept in session storage, attached to FFAX API requests as Bearer tokens, and validated server-side by issuer, audience, organization, and project roles.

For registration verification and password-reset email, fill the `ZITADEL_SMTP_*` values in `infra/zitadel/.env`. QQ Mail can be used as the SMTP sender with `smtp.qq.com:465`, TLS enabled, and the mailbox SMTP authorization code as the password; QQ addresses can also register as ordinary users.

## Production values

Before production deployment, edit `infra/zitadel/.env` and use:

- A dedicated HTTPS hostname such as `auth.ffax.com`.
- Exact production callback and post-logout URLs under `https://www.ffax.com/workbench`.
- Managed secrets and a dedicated PostgreSQL role.
- `FFAX_DEV_MODE=false`.

After changing public URLs, rerun setup; it updates the existing `FFAX Web` redirect and logout allowlists. Never place a PAT, private key, database password, or client secret in a `VITE_` variable.
