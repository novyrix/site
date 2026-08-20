FROM node:22-bookworm-slim AS dependencies

WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src
RUN npx prisma generate && npm run build

FROM dependencies AS migrate

COPY prisma ./prisma
CMD ["npx", "prisma", "migrate", "deploy"]

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 novyrix \
  && useradd --system --uid 1001 --gid novyrix --home-dir /app novyrix

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma/client ./node_modules/@prisma/client

USER novyrix
EXPOSE 8080

CMD ["node", "dist/index.js"]
