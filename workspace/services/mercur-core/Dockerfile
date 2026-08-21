FROM node:22-bookworm-slim AS builder

WORKDIR /source
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run codegen --workspace @ffax/mercur-api && \
    DISABLE_MEDUSA_ADMIN=true \
    DISABLE_MERCUR_DASHBOARDS=true \
    npm exec --workspace @ffax/mercur-api -- medusa build

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /source/packages/api/.medusa/server ./
RUN node -e "const fs=require('node:fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));delete p.devDependencies;fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n')"
RUN npm install --omit=dev --legacy-peer-deps --ignore-scripts

EXPOSE 9000
CMD ["npm", "run", "start"]
