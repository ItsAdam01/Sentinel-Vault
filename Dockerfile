# Use the official Node.js 18 image as our base
FROM node:18-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port our app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
