# Stage 1: Build
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Copy the .env.production file
COPY .env.production .env

# Install only production dependencies
RUN npm install --only=production

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
