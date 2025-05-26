# Stage 1: Build assets (if you're using Vite for frontend)
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY resources ./resources
COPY vite.config.js tailwind.config.js postcss.config.js ./
RUN npm run build

# Stage 2: Final image with PHP and NGINX
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    gettext \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy built assets from build stage
COPY --from=build /app/public/build /var/www/public/build

# Copy application source code
COPY . /var/www

# Fix permissions (using www-data user)
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

# Copy NGINX config and startup script
COPY docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/start.sh /usr/local/bin/start.sh

# Make startup script executable
RUN chmod +x /usr/local/bin/start.sh

# Expose Railway dynamic port
EXPOSE 8080

# Start everything
CMD ["/usr/local/bin/start.sh"]
