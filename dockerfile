# Use Node image as base image
FROM node:22.12.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies with flag --legacy-peer-deps to be able to install @nestjs/swagger
RUN npm install

# Copy all files to the working directory
COPY . .

# 👇 Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port for the application
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]