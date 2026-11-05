# syntax=docker/dockerfile:1

# Node 24 LTS (Node 20 reached end of life in April 2026).
FROM node:24-alpine AS base
WORKDIR /app

# Full install (dev tools included) for compiling TypeScript.
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM deps AS build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Runtime dependencies only (no TypeScript, tsx, esbuild or @types), pruned from the
# full install instead of downloading everything a second time.
FROM deps AS prod-deps
RUN npm prune --omit=dev --no-audit --no-fund

FROM base AS runner
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
# Unprivileged user; the app files stay root-owned, so the process can't modify its own code.
USER node
EXPOSE 4000
CMD ["node", "--enable-source-maps", "dist/index.js"]
