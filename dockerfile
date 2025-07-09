# Stage 1: Build
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20.11.1-alpine AS production

WORKDIR /app

# Only copy what's needed for runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
