# Build stage
FROM node:20-alpine AS builder

# Install necessary tools
RUN apk add --no-cache curl

# Install pnpm using npm instead of corepack
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy source code and config files
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Clean any previous builds
RUN rm -rf dist

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm and netcat
RUN npm install -g pnpm && \
    apk add --no-cache netcat-openbsd dos2unix

# Copy production files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY package.json pnpm-lock.yaml setup-db.sh ./

RUN chmod +x setup-db.sh

# Expose port 3001
EXPOSE 3001

# Start the application
ENTRYPOINT ["./setup-db.sh"]
CMD ["node", "dist/src/main.js"]