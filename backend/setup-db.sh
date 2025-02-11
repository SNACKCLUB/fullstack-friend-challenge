#!/bin/sh

# Espera o Postgres estar pronto
echo "Waiting for PostgreSQL to be ready..."
until nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Executa as migrations
echo "Running migrations..."
pnpm prisma migrate deploy

# Executa os seeds se estiver em desenvolvimento
if [ "$NODE_ENV" = "development" ]; then
  echo "Running seeds..."
  pnpm prisma:seed
fi

# Inicia a aplicação
echo "Starting application..."
exec "$@"