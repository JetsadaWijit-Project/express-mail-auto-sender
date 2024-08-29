# Use a Node.js base image with the desired version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Express app will listen on (e.g., 3000)
EXPOSE 3000

# Define the command to start your Express app
CMD ["npm", "start"]