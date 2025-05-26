#!/bin/bash

# Start PHP-FPM in foreground (with root permission)
php-fpm -F -R -O --nodaemonize --fpm-config /usr/local/etc/php-fpm.d/www.conf &

# Wait briefly for PHP-FPM to start
sleep 2

# Start Nginx in foreground
nginx -g "daemon off;"