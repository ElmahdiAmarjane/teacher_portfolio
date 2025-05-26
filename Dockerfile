# Stage 1: Build React assets
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY resources ./resources
COPY vite.config.js tailwind.config.js postcss.config.js ./
RUN npm run build

# Stage 2: Production image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure PHP-FPM to run as root
RUN sed -i 's/user = www-data/user = root/g' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/group = www-data/group = root/g' /usr/local/etc/php-fpm.d/www.conf

# Copy application files
COPY --from=build /app/public/build /var/www/public/build
COPY . /var/www

# Copy configurations
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/start.sh /usr/local/bin/start.sh

# Set permissions
RUN chown -R root:root /var/www/storage \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache \
    && chmod +x /usr/local/bin/start.sh

# Expose the port Railway will use
EXPOSE 8080

# Start the application
CMD ["/usr/local/bin/start.sh"]