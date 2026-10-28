# syntax=docker/dockerfile:1
ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Imagen de herramientas: migraciones y seed (usa tsx, no esta en la imagen de ejecucion).
FROM deps AS tools
WORKDIR /app
COPY . .
CMD ["npm", "run", "db:migrate"]

FROM deps AS build
WORKDIR /app
ARG APP_VERSION=dev
ENV APP_VERSION=${APP_VERSION} NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ARG APP_VERSION=dev
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 APP_VERSION=${APP_VERSION} PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --retries=5 CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
