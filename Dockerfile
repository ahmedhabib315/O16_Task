# Use the official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application (if necessary)
RUN npm run build

# Expose the port your NestJS server is listening on
EXPOSE 3000

# Start the NestJS server
CMD ["npm", "start"]