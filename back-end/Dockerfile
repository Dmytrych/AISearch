# Use the official Node.js image as the base image
FROM node:16-alpine

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
EXPOSE 4000

# Command to run the database migrations and then start the application
CMD ["sh", "-c", "npm run db:migrate && npm start"]
