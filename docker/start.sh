#!/bin/bash

# Remplace ${PORT} par sa valeur réelle dans nginx.conf
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Démarre php-fpm
php-fpm &

# Démarre nginx en foreground
nginx -g "daemon off;"
