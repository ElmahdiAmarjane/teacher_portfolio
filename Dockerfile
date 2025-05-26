# Stage 1: Build React assets
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY resources ./resources
COPY vite.config.js tailwind.config.js postcss.config.js ./
RUN npm run build

# Stage 2: Laravel + PHP + Nginx
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# PHP-FPM as root (to avoid permission issues)
RUN sed -i 's/user = www-data/user = root/g' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/group = www-data/group = root/g' /usr/local/etc/php-fpm.d/www.conf

# Copy app
WORKDIR /var/www
COPY --from=build /app/public/build /var/www/public/build
COPY . .

# Copy configs
COPY docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/start.sh /usr/local/bin/start.sh

# Permissions
RUN chmod -R 775 storage bootstrap/cache \
    && chmod +x /usr/local/bin/start.sh

EXPOSE 8080

CMD ["/usr/local/bin/start.sh"]
