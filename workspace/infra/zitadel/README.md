# FFA-X ZITADEL authentication

This directory deploys the official, unmodified ZITADEL API and Login V2 images as an independent service. FFA-X connects through standard OpenID Connect and API boundaries. `ZITADEL_SERVICEPING_ENABLED=false` is set in `docker-compose.yml`.

No ZITADEL source code is copied into or modified by FFA-X. Keep the ZITADEL deployment, database, upgrades, and backups operationally separate from the FFA-X application.

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

The FFA-X login page completes the OIDC authentication request through the ZITADEL Session API. The FFA-X registration page creates a real human user through the ZITADEL User V2 API, asks ZITADEL to send the verification email, and verifies the code through a POST request only after the user explicitly confirms it. Access tokens are kept in session storage, attached to FFA-X API requests as Bearer tokens, and validated server-side by issuer, audience, organization, and project roles.

For registration verification and password-reset email, fill the `ZITADEL_SMTP_*` values in `infra/zitadel/.env`. Self-registration is not operational until SMTP delivery and the generated `FFAX_FRONTEND_URL` are both configured. QQ Mail can be used as the SMTP sender with `smtp.qq.com:465`, TLS enabled, and the mailbox SMTP authorization code as the password; QQ addresses can also register as ordinary users.

## Production values

Before production deployment, edit `infra/zitadel/.env` and use:

- A dedicated HTTPS hostname such as `auth.ffax.com`.
- `FFAX_FRONTEND_URL` set to the complete frontend application root, such as `https://www.ffax.com/workbench`.
- An exact production callback under `https://www.ffax.com/workbench` and a post-logout URL that returns to `https://www.ffax.com/`.
- Managed secrets and a dedicated PostgreSQL role.
- `FFAX_DEV_MODE=false`.

After changing public URLs, rerun setup; it updates the existing `FFAX Web` redirect and logout allowlists. Never place a PAT, private key, database password, or client secret in a `VITE_` variable.
