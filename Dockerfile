FROM node:22.12.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

# At runtime: generate + deploy + start
CMD ["sh", "-c", "npx prisma generate && npm run prisma:deploy && npm run start:prod"]
