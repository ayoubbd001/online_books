# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run your app in development mode
CMD ["npm", "run", "dev"]
