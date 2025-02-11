# Build stage
FROM node:20-alpine AS builder

# Install necessary tools
RUN apk add --no-cache curl

# Install pnpm using npm instead of corepack
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build the project
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm using npm
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Add netcat for the health check in setup-db.sh
RUN apk add --no-cache netcat-openbsd

# Copy and make the setup script executable
COPY setup-db.sh ./
RUN chmod +x setup-db.sh

# Expose port 3000
EXPOSE 3000

# Use the setup script as entrypoint
ENTRYPOINT ["./setup-db.sh"]
CMD ["pnpm", "start:prod"]