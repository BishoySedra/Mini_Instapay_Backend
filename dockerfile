# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Provide dummy DATABASE_URL to avoid Prisma schema errors at build time
ENV DATABASE_URL="postgresql://postgres.odxchrhyjzoshvrmrbtv:Bishoy@123@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Run prisma generate safely
RUN npx prisma generate

# Build app (this will also run prisma:dev:deploy per your script)
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose app port
EXPOSE 3000

# 🟡 You MUST set a real DATABASE_URL at runtime (via docker run -e or compose)
ENV NODE_ENV=production

CMD ["node", "dist/src/main"]