FROM node:22.12.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

# Run Prisma generate with env and start app
CMD ["sh", "-c", "npx prisma generate && npm run start:prod"]
