#!/bin/sh

# Generate key if not set
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --force
fi

# Optimize application
php artisan optimize:clear
php artisan optimize
php artisan view:cache

# Start services
php-fpm -D
nginx -g 'daemon off;'