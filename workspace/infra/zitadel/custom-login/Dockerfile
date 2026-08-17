FROM node:24-alpine AS builder

WORKDIR /src
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json .npmrc buf.gen.yaml buf.work.yaml ./
COPY proto ./proto
COPY packages ./packages
COPY apps/login ./apps/login

RUN pnpm install --frozen-lockfile

ARG NEXT_PUBLIC_BASE_PATH=/ui/v2/login
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
RUN pnpm --filter @zitadel/proto generate
RUN pnpm --filter @zitadel/client build
RUN pnpm --filter @zitadel/login build

FROM node:24-alpine

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /.env-file && \
    touch /.env-file/.env && \
    chown -R nextjs:nodejs /.env-file

COPY --from=builder --chown=nextjs:nodejs /src/apps/login/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /src/apps/login/public ./apps/login/public

USER nextjs
ENV HOSTNAME="::" \
    PORT="3000" \
    NODE_ENV="production" \
    NODE_OPTIONS="--use-openssl-ca --require /app/load-ssl-cert-dir.cjs" \
    SSL_CERT_FILE="/etc/ssl/certs/ca-certificates.crt" \
    ZITADEL_TLS_ENABLED="false" \
    OTEL_SERVICE_NAME="zitadel-login" \
    OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["/usr/local/bin/node", "/app/healthcheck.mjs", "/ui/v2/login/ready"]

ENTRYPOINT ["/app/entrypoint.sh", "node", "apps/login/server.js"]
