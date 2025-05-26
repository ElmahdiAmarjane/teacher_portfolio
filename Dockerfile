# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM php:8.2-fpm
RUN apt-get update && apt-get install -y nginx
COPY --from=build /app/public/build /var/www/public/build
COPY . /var/www
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
CMD php-fpm -D && nginx -g 'daemon off;'