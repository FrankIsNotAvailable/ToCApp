#base image for all stages
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

#staging for development
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npx", "vite", "dev", "--host", "0.0.0.0"]

# build stage for production
FROM base AS builder
ARG VITE_API_BASE_URL
ARG VITE_APP_TITLE
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_TITLE=$VITE_APP_TITLE

# Install all dependencies including devDependencies needed to build
RUN npm ci --include=dev 
COPY . .
RUN npm run build

#production stage for serving the app with Nginx
FROM nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]