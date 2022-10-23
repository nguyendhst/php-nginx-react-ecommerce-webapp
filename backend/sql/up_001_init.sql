CREATE TABLE `products` (
  `product_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_model` varchar(255) NOT NULL,
  `manufacturer_id` bigint NOT NULL,
  `type_id` bigint NOT NULL,
  `compatible_id` bigint NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT (now())
);