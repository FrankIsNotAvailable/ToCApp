# -------------------------------------------------------------------
# Stage 1: Base (Shared dependencies)
# -------------------------------------------------------------------
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# -------------------------------------------------------------------
# Stage 2: Staging / Development
# -------------------------------------------------------------------
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npx", "vite", "dev", "--host", "0.0.0.0"]

# -------------------------------------------------------------------
# Stage 3: Builder (Compiles SvelteKit static assets)
# -------------------------------------------------------------------
FROM base AS builder
ENV NODE_ENV=production
ARG VITE_API_BASE_URL
ARG VITE_APP_TITLE
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_TITLE=$VITE_APP_TITLE
RUN npm ci
COPY . .
RUN npm run build

# -------------------------------------------------------------------
# Stage 4: Production (Nginx static file server)
# -------------------------------------------------------------------
FROM nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]