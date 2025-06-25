# Use Node.js version 22.12.0 as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the application port
EXPOSE 8000

# Define the command to run the application "npm run start:prod"
CMD ["npm", "run", "start:prod"]
