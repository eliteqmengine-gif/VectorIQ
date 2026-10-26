# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN set -eux; \
  echo ">>> node: $(node -v)  npm: $(npm -v)"; \
  REQUIRED_NODE=$(node -e "try{const p=require('./package.json'); console.log(p.engines&&p.engines.node||'') }catch(e){console.log('')}"); \
  echo ">>> package.json engines.node: '$REQUIRED_NODE'"; \
  if [ -n "$REQUIRED_NODE" ]; then \
    REQ_MAJOR=$(echo "$REQUIRED_NODE" | sed -E 's/[^0-9]*([0-9]+).*/\1/'); \
    CUR_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1); \
    if [ -n "$REQ_MAJOR" ] && [ "$CUR_MAJOR" -lt "$REQ_MAJOR" ]; then \
      echo "ERROR: Node major version $CUR_MAJOR is less than required $REQ_MAJOR by package.json engines field"; \
      exit 1; \
    fi; \
  fi; \
  echo ">>> verifying package.json vs package-lock.json with npm ci --dry-run"; \
  npm ci --dry-run || { \
    echo "ERROR: npm ci --dry-run failed — regenerate package-lock.json using the correct Node version and commit it."; \
    exit 1; \
  }; \
  npm ci
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
