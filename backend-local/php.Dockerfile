FROM php:7.4-fpm
RUN docker-php-ext-install mysqli
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    git \
    && docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
RUN composer require firebase/php-jwt