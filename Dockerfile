# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .
ENV NEXT_PUBLIC_API_DOMAIN=http://192.168.1.119:8080

# Build the Next.js application
RUN npm run build

# Use a smaller Node.js image to run the app
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the build output and necessary files from the previous stage
COPY --from=build /app/.next .next
COPY --from=build /app/public public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.js ./
COPY --from=build /app/.env ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
