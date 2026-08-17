FROM node:22-alpine

WORKDIR /app

COPY server/package.json ./package.json
RUN npm install --omit=dev --ignore-scripts

COPY server ./server

EXPOSE 8000

CMD ["node", "server/index.js"]
