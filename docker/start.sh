#!/bin/bash

# Remplace ${PORT} par la vraie valeur dans le template NGINX
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Lancer PHP-FPM (en arrière-plan)
php-fpm &

# Lancer NGINX (au premier plan)
nginx -g "daemon off;"
