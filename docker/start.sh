#!/bin/bash

# Start PHP-FPM in background (fixed port 9000)
php-fpm -D -O -R --listen 127.0.0.1:9000

# Start Nginx in foreground (using Railway's PORT)
nginx -g "daemon off;"