# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

ENV NODE_ENV=production
CMD ["node", "dist/main"]
