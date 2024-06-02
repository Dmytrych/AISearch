# Use the official Node.js image as the base image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY knexfile.cjs ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the application will run on
EXPOSE 4001

# Command to run the database migrations and then start the application
CMD ["sh", "-c", "npm start"]
