# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Install libc6-compat as needed
RUN apk add --no-cache libc6-compat

# Enable Corepack and ensure compatibility with specific Yarn versions
RUN corepack enable && corepack prepare yarn@4.5.0 --activate

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./

RUN echo "Using Yarn"; \
    yarn install --immutable;

# List contents for debugging
RUN ls -la /app

# Build stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during the build if needed
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build

# Production image
FROM base AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]