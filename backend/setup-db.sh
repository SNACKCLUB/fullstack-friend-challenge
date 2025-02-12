#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run migrations
echo "Running migrations..."
pnpm prisma migrate deploy

# Run seeds if in development
if [ "$NODE_ENV" = "development" ]; then
  echo "Running seeds..."
  pnpm prisma:seed
fi

# Start the application with the command passed to docker
echo "Starting application..."
exec "$@"