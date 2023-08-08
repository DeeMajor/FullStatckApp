# Stage 1: Build React app
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json (if using npm)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Create a production-ready image
FROM nginx:latest

# Remove the default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build files from Stage 1 to Nginx web server's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx will listen on (default is 80)
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
