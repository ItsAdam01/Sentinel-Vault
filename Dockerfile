# Use Node.js 18 slim version
FROM node:18-slim

# Install build tools for better-sqlite3: python3: make: and g++
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the server
CMD ["npm", "start"]
