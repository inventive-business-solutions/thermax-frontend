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
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn install --immutable; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Accept build arguments
ARG FRAPPE_ADMIN_AUTH_SECRET
ARG AWS_S3_BUCKET_BASE_FOLDER
ARG AWS_S3_BUCKET_NAME
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_S3_REGION
ARG NEXT_PUBLIC_BASE_URL
ARG FRAPPE_BASE_URL
ARG NEXT_PUBLIC_FRAPPE_DOMAIN_NAME
ARG NODE_ENV
ARG AUTH_SECRET
ARG FRAPPE_ADMIN_AUTH_KEY

# Set environment variables
ENV FRAPPE_ADMIN_AUTH_SECRET=$FRAPPE_ADMIN_AUTH_SECRET
ENV AWS_S3_BUCKET_BASE_FOLDER=$AWS_S3_BUCKET_BASE_FOLDER
ENV AWS_S3_BUCKET_NAME=$AWS_S3_BUCKET_NAME
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_S3_REGION=$AWS_S3_REGION
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV FRAPPE_BASE_URL=$FRAPPE_BASE_URL
ENV NEXT_PUBLIC_FRAPPE_DOMAIN_NAME=$NEXT_PUBLIC_FRAPPE_DOMAIN_NAME
ENV NODE_ENV=$NODE_ENV
ENV AUTH_SECRET=$AUTH_SECRET
ENV FRAPPE_ADMIN_AUTH_KEY=$FRAPPE_ADMIN_AUTH_KEY

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

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

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
