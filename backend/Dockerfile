# Dockerfile
FROM node:20-alpine AS builder

# Adiciona curl para healthcheck
RUN apk add --no-cache curl

# Instala o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia os arquivos de configuração
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install --frozen-lockfile

# Copia o resto do código
COPY . .

# Gera o Prisma Client
RUN pnpm prisma generate

# Compila o projeto
RUN pnpm build

# Imagem de produção
FROM node:20-alpine

WORKDIR /app

# Instala o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia os arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["pnpm", "start:prod"]