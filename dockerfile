# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of your application
COPY . .

# Expose port 3000 (default for Next.js)
EXPOSE 3000

# Run the Next.js development server
CMD ["yarn", "dev"]
