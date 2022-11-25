CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int,
  `status` ENUM ('out_of_stock', 'in_stock', 'running_low'),
  `category` varchar(255) NOT NULL,
  `main_image` int,
  `created_at` datetime DEFAULT (now()),
  `last_modified` datetime DEFAULT (now())
);

CREATE TABLE `product_specs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int UNIQUE,
  `desc` varchar(255),
  `created_at` datetime DEFAULT (now()),
  `last_modified` datetime DEFAULT (now())
);

CREATE TABLE `image_links` (
  `link_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `link` varchar(255) NOT NULL
);

CREATE INDEX `product_status` ON `products` (`status`);

CREATE UNIQUE INDEX `products_index_1` ON `products` (`id`);

CREATE UNIQUE INDEX `product_specs_index_2` ON `product_specs` (`id`);

CREATE UNIQUE INDEX `image_links_index_3` ON `image_links` (`link_id`);

ALTER TABLE  `products` ADD FOREIGN KEY (`main_image`) REFERENCES `image_links` (`link_id`)  ;

ALTER TABLE `image_links` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_specs` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);


SET FOREIGN_KEY_CHECKS=0;

INSERT INTO `products` (`id`, `name`, `category`, `price`, `status`, `main_image`) VALUES 
  (1, 'Pin dự phòng sạc nhanh 20.000mAh Velasboost F2', 'Charger', 499000, 'in_stock', 1);

INSERT INTO `product_specs` (`id`, `product_id`, `desc`) VALUES 
  (1, 1, 'Pin dự phòng sạc nhanh 20.000mAh Velasboost F2');

INSERT INTO `image_links` (`link_id`, `product_id`, `link`) VALUES 
  (1, 1, 'https://product.hstatic.net/200000384841/product/pin1_1f6c210109a1449a9e6804dac2caf6ed_master.jpg'),
  (2, 1, 'https://product.hstatic.net/200000384841/product/pin2_36f67353b96f4cfe98d84158fe66d026_master.jpg');

SELECT `link` FROM `image_links` WHERE `product_id` = 1;

SELECT `link` FROM `image_links` INNER JOIN `products` ON `image_links`.`link_id` = `products`.`main_image` WHERE `products`.`id` = 1;

SET FOREIGN_KEY_CHECKS=1;