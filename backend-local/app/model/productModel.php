<?php

require_once PROJECT_ROOT . "/model/database.php";

class ProductModel extends ProductDatabase {

    public function getAllProducts() {
        $query = "SELECT * FROM products";
        $params = [];
        return $this->select($query, $params);
    }

    public function getProducts($limit, $offset, $category) {
        
        if ($category != '') {
            $query = "SELECT * FROM products WHERE category LIKE ? LIMIT ? OFFSET ?;";
            $params = [
                "sii",
                $category,
                $limit,
                $offset
            ];
        } else {
            $query = "SELECT * FROM products LIMIT ? OFFSET ?;";
            $params = [
                "ii",
                $limit,
                $offset
            ];
        }
        return $this->select($query, $params);
    }

    public function getProductImages($product_id) {
        // SELECT `link` FROM `image_links` WHERE `product_id` = 1;
        $query = "SELECT `link_id`, `link` FROM `image_links` WHERE `product_id` = ?;";
        $params = [
            "i",
            $product_id
        ];
        return $this->select($query, $params);
    }
    
    public function getProductMainImage($product_id) {
        // SELECT `link_id`, `link` FROM `image_links` INNER JOIN `products` ON `image_links`.`link_id` = `products`.`main_image` WHERE `products`.`id` = 1;
        $query = "SELECT `link_id`, `link` FROM `image_links` INNER JOIN `products` ON `image_links`.`link_id` = `products`.`main_image` WHERE `products`.`id` = ?;";
        $params = [
            "i",
            $product_id
        ];
        return $this->select($query, $params);
    }
}