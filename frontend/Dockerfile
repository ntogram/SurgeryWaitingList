# Use the official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the app for production with minification
#RUN npm run build

# Serve the app using a lightweight server like serve
#RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the app
#CMD ["serve", "-s", "build"]

# dev mode

CMD ["npm", "start"]
