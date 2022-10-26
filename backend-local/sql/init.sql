CREATE TABLE `brands` (
  `id` int,
  `country_code` int,
  `brand_name` varchar(255),
  `created at` varchar(255),
  PRIMARY KEY (`id`, `country_code`)
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `role` ENUM ('admin', 'customer'),
  `created_at` timestamp,
  `account_id` int NOT NULL
);

CREATE TABLE `countries` (
  `code` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `continent_name` varchar(255) NOT NULL
);

CREATE TABLE `accounts` (
  `account_id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL
);

CREATE TABLE `order_items` (
  `order_id` varchar(255),
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`order_id`, `product_id`)
);

CREATE TABLE `orders` (
  `id` varchar(255) PRIMARY KEY,
  `user_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` varchar(255) datetime DEFAULT (now())
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `brand_id` int NOT NULL,
  `price` int,
  `status` ENUM ('out_of_stock', 'in_stock', 'running_low'),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `colors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `color` varchar(255) NOT NULL
);

CREATE TABLE `product_colors` (
  `product_id` int AUTO_INCREMENT,
  `color_id` int AUTO_INCREMENT,
  PRIMARY KEY (`product_id`, `color_id`)
);

CREATE TABLE `product_tags` (
  `id` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE INDEX `product_status` ON `products` (`brand_id`, `status`);

CREATE UNIQUE INDEX `products_index_1` ON `products` (`id`);

ALTER TABLE `brands` ADD FOREIGN KEY (`country_code`) REFERENCES `countries` (`code`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`account_id`) REFERENCES `users` (`account_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_colors` ADD FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`);

ALTER TABLE `product_colors` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);

CREATE TABLE `product_tags_products` (
  `product_tags_id` int,
  `products_id` int,
  PRIMARY KEY (`product_tags_id`, `products_id`)
);

ALTER TABLE `product_tags_products` ADD FOREIGN KEY (`product_tags_id`) REFERENCES `product_tags` (`id`);

ALTER TABLE `product_tags_products` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

