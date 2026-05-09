FROM node:22-alpine AS builder

ARG PNPM_VERSION=10.33.0

# Install pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_CURRENCY
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_DEFAULT_LOCALE
ARG NEXT_PUBLIC_SUPPORTED_LOCALES

# Set environment variables for build
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_CURRENCY=${NEXT_PUBLIC_CURRENCY}
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_DEFAULT_LOCALE=${NEXT_PUBLIC_DEFAULT_LOCALE}
ENV NEXT_PUBLIC_SUPPORTED_LOCALES=${NEXT_PUBLIC_SUPPORTED_LOCALES}

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN PNPM_CONFIG_STRICT_DEP_BUILDS=false pnpm install --no-frozen-lockfile

# Copy application code
COPY . .

# Build Next.js application
RUN pnpm run build

# Production image
FROM node:22-alpine AS runner

# Install pnpm
ARG PNPM_VERSION=10.33.0
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

ENV NODE_ENV production

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN PNPM_CONFIG_STRICT_DEP_BUILDS=false pnpm install --no-frozen-lockfile --prod && pnpm store prune

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/src ./src
COPY --from=builder /app/i18n.js ./i18n.js

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3001/ || exit 1

# Start Next.js
CMD ["pnpm", "start"]
