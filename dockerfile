# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Generate Prisma client (if needed)
RUN npx prisma generate

# Build the app
RUN npm run build

# Stage 2: Copy and run the built app
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose application port
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Run database migrations (optional: depends on how your production db is managed)
RUN npx prisma migrate deploy

# Start the app
CMD ["node", "dist/src/main"]
