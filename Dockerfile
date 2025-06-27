FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ⚠️ Do NOT generate Prisma here
# RUN npx prisma generate

RUN npm run build

EXPOSE 4000

# Prisma generate at runtime to ensure env is available
CMD ["sh", "-c", "npx prisma generate && node dist/main.js"]
