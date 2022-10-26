<?php

require_once PROJECT_ROOT . "/model/database.php";

class ProductModel extends Database {

    public function getAllProducts() {
        $query = "SELECT * FROM products";
        $params = [];
        return $this->select($query, $params);
    }

    public function getProducts($limit, $offset) {
        $query = "SELECT * FROM products LIMIT ? OFFSET ?;";
        $params = [
            "ii",
            $limit,
            $offset
        ];
        return $this->select($query, $params);
    }
    
}