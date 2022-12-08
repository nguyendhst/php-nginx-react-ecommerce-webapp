SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int,
  `status` ENUM ('out_of_stock', 'in_stock', 'running_low'),
  `category` varchar(255) NOT NULL,
  `main_image` int,
  `desc` varchar(255),
  `created_at` datetime DEFAULT (now()),
  `last_modified` datetime DEFAULT (now())
);

DROP TABLE IF EXISTS `image_links`;
CREATE TABLE `image_links` (
  `link_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `link` varchar(255) NOT NULL
);

CREATE INDEX `product_status` ON `products` (`status`);

CREATE UNIQUE INDEX `products_index_1` ON `products` (`id`);

CREATE UNIQUE INDEX `image_links_index_3` ON `image_links` (`link_id`);

ALTER TABLE  `products` ADD FOREIGN KEY (`main_image`) REFERENCES `image_links` (`link_id`)  ;

ALTER TABLE `image_links` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);




INSERT INTO `products` (`id`, `name`, `category`, `price`, `status`, `main_image`, `desc`) VALUES 
  (1, 'Pin dự phòng sạc nhanh 20.000mAh Velasboost F2', 'Powerbank', 499000, 'in_stock', 1, 'Pin dự phòng sạc nhanh 20.000mAh Velasboost F2'),
  (2, 'Combo Sạc & Cáp 20W (Củ 20w-C, Cáp PD SS1)', 'Charger', 399000, 'out_of_stock', 3, 'Bộ sạc nhanh 20W đầu tiên của Việt Nam đạt chuẩn MFi của Apple'),
  (3, 'Sạc nhanh 130w Velasboost', 'Charger', 1350000, 'in_stock', 4, 'Sạc nhanh đa cổng công suất cao nhất Việt Nam thời điểm hiện tại'),
  (4, 'Sạc 2 cổng 12W Velasboost', 'Charger', 139000, 'out_of_stock', 5, 'Mẫu sạc đa dụng 2 cổng, công suất 12W'),
  (5, 'Sạc nhanh Velasboost N93 20W', 'Charger', 250000, 'in_stock', 6, 'Mẫu sạc nhanh 20W, 2 cổng, hỗ trợ QC và PD'),
  (6, 'Tai nghe TWS velasboost LAM ANC', 'TWS', 1390000, 'in_stock', 7, 'Tai nghe TWS hỗ trợ chống ồn chủ động ANC'),
  (7, 'Tai nghe TWS velasboost G1X ANC', 'TWS', 890000, 'out_of_stock', 8, 'Tai nghe TWS hỗ trợ chống ồn chủ động ANC'),
  (8, 'Tai nghe TWS MAY gen 2', 'TWS', 799000, 'in_stock', 9, 'Tai nghe đầu tiên của Việt Nam, xuất hiện trên trang chủ chip Qualcomm'),
  (9, 'Tai nghe TWS velasboost G1', 'TWS', 480000, 'in_stock', 10, 'Tai nghe TWS phiên bản Gaming'),
  (10, '[MFi] Cáp Type C to Lightning Soft Silicon SS1', 'Cable', 239000, 'out_of_stock', 11, 'Sợi cáp sạc nhanh chuẩn PD, vật liệu mới, Soft Silicon siêu mềm. Sạc nhanh tất cả các thiết bị iPhone.'),
  (11, 'Cáp 4 in 1 velasX', 'Cable', 149000, 'in_stock', 12, 'Mẫu cáp đa năng 4 in 1 dành cho nhiều thiết bị'),
  (12, 'Cáp sạc nhanh 3 đầu Velasboost 66W', 'Cable', 149000, 'in_stock', 13, 'Cáp sạc nhanh 3 đầu Velasboost 66W'),
  (13, 'Cáp USB C to USB C USB 3.2 100W', 'Cable', 350000, 'in_stock', 14, 'Cáp C to C chuyên dụng cho sạc iPad, Macbook và các thiết bị Android, sạc nhanh, truyền dữ liệu nhanh gấp 42 lần chuẩn USB 2.0 thông thường, truyền hình ảnh từ Macbook ra màn hình lớn.'),
  (14, 'Pin dự phòng Dynamic 2 - 20.000 mAh 20W', 'Powerbank', 599000, 'in_stock', 15, 'Pin dự phòng 20.000 mAh sử dụng lõi pin Panasonic, sử dụng trong xe Telas Model 3, 74Wh'),
  (15, 'Ghế công thái học Black Velas', 'Lifestyle', 3500000, 'out_of_stock', 16, 'Ghế công thái học, phiên bản hợp tác giữa Velasboost và HyperWork')
  (16, 'Sạc nhanh 33W 2 cổng N33 - 2 ports', 'Charger', 299000, 'in_stock', 17, 'Mẫu sạc nhanh 33W kích thước nhỏ, hỗ trợ QC, PD, PPS');


INSERT INTO `image_links` (`link_id`, `product_id`, `link`) VALUES 
  (1, 1, 'https://product.hstatic.net/200000384841/product/pin1_1f6c210109a1449a9e6804dac2caf6ed_master.jpg'),
  (2, 1, 'https://product.hstatic.net/200000384841/product/pin2_36f67353b96f4cfe98d84158fe66d026_master.jpg'),
  (3, 2, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten_-_2021-10-04t135416.932_03a6860959ff44fa959c90eb3c86f3ea_master.png'),
  (4, 3, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten__94__5ef2495544f04eeeb59e03bc0c1acf0c_master.png'),
  (5, 4, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten__2__d7dc9b2dee354918bb3f7d8643947fd5_master.png'),
  (6, 5, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten__90__c353461f653e41e19a425e565e7caec3_master.png'),
  (7, 6, 'https://product.hstatic.net/200000384841/product/thiet_ke_chua_co_ten__12__84adc2c1123342fe8d8ab48054a9da3d_master.png'),
  (8, 7, 'https://product.hstatic.net/200000384841/product/thiet_ke_chua_co_ten__5__e02450fadb8549f6843e0c111f07b149_master.png'),
  (9, 8, 'https://product.hstatic.net/200000384841/product/thiet_ke_chua_co_ten__25__a886c9ce099640c184ae8be8d0b74e53_master.png'),
  (10, 9, 'https://product.hstatic.net/200000384841/product/thiet_ke_chua_co_ten__14__ae693888fa2b460e9591a564ae687741_master.png'),
  (11, 10, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten_-_2021-10-04t142214.103_883453e9cde14beaa900561d7f0dccbb_master.png'),
  (12, 11, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten__4__475ddf1dc66f4f72b69e4059df8da16f_master.png'),
  (13, 12, 'https://product.hstatic.net/200000384841/product/mau_ghi_e3de701ab52c4c9a91682b6e4e7ef44a_master.jpg'),
  (14, 13, 'https://product.hstatic.net/200000384841/product/20w__45__7b68c570a3fd45f7af8475b736fcd4f3_master.png'),
  (15, 14, 'https://product.hstatic.net/200000384841/product/thiet_ke_chua_co_ten__16__0109ae4563c34deeb857f09cd446c0d9_master.png'),
  (16, 15, 'https://product.hstatic.net/200000384841/product/thiet_ke_khong_ten__1__8068865e7de7428b955fa66d421a60eb_master.png'),
  (17, 16, 'https://product.hstatic.net/200000384841/product/thiet_ke_chua_co_ten_29de2d5108e14793af662ec17b41cf17_master.png');

SET FOREIGN_KEY_CHECKS=1;