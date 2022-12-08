<?php

class ProductController extends BaseController {

    /**
     * List products
     * GET /products/list?limit=[]&offset=[]&category=[]
     * @return array
     */

    public function listAction() {

        // error response
        $errStr ='';
        $errHeader ='';

        // get method
        $method = $_SERVER['REQUEST_METHOD'];
        // get query params
        $queryParams = $this->getQueryParams();
        if (strtoupper($method) !== 'GET') {
            $this->responseWriter(array('error' => 'Method not allowed'), array('HTTP/1.1 405 Method Not Allowed'));
            return;
        } else {
            try {
                $productModel = new ProductModel();
                $defaultLimit = 10;

                if (isset($queryParams['limit']) && is_numeric($queryParams['limit']) && $queryParams['limit'] >= 0) {
                    $limit = $queryParams['limit'];
                } else {
                    $limit = $defaultLimit;
                }

                if (isset($queryParams['offset']) && is_numeric($queryParams['offset']) && $queryParams['offset'] >= 0) {
                    $offset = $queryParams['offset'];
                } else {
                    $offset = 0;
                }

                if (isset($queryParams['category']) && is_string($queryParams['category'])) {
                    $category = $queryParams['category'];
                } else {
                    $category = '';
                }
                if (!isset($queryParams['category']) && !isset($queryParams['limit']) && !isset($queryParams['offset'])) {
                    $products = $productModel->getAllProducts();
                } else {
                    $products = $productModel->getProducts($limit, $offset, $category);
                }
                $res = json_encode($products, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('listAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );

            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'HTTP/1.1 200 OK',
                        'Content-Type: application/json'
                    )
                );
            }
        }
    }


    /**
     * Get products images links
     * GET /products/images?id=[]
     * @return array
     */

    public function imagesAction() {
            
        // error response
        $errStr ='';
        $errHeader ='';

        // get method
        $method = $_SERVER['REQUEST_METHOD'];
        // get query params
        $queryParams = $this->getQueryParams();
        if (strtoupper($method) !== 'GET') {
            $this->responseWriter(array('error' => 'Method not allowed'), array('HTTP/1.1 405 Method Not Allowed'));
            return;
        } else {
            try {
                $productModel = new ProductModel();

                if (isset($queryParams['id']) && is_numeric($queryParams['id']) && $queryParams['id'] >= 0) {
                    $id = $queryParams['id'];
                } else {
                    $id = 0;
                }

                $images = $productModel->getProductImages($id);
                $res = json_encode($images, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('imagesAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );

            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'HTTP/1.1 200 OK',
                        'Content-Type: application/json'
                    )
                );
            }
        } 
    }

    /**
     * Get products main image link
     * GET /products/mainimage?id=[]
     * @return array
    */

    public function mainimageAction() {
            
        // error response
        $errStr ='';
        $errHeader ='';

        // get method
        $method = $_SERVER['REQUEST_METHOD'];
        // get query params
        $queryParams = $this->getQueryParams();
        if (strtoupper($method) !== 'GET') {
            $this->responseWriter(array('error' => 'Method not allowed'), array('HTTP/1.1 405 Method Not Allowed'));
            return;
        } else {
            try {
                $productModel = new ProductModel();

                if (isset($queryParams['id']) && is_numeric($queryParams['id']) && $queryParams['id'] >= 0) {
                    $id = $queryParams['id'];
                } else {
                    $id = 0;
                }

                $images = $productModel->getProductMainImage($id);
                $res = json_encode($images, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('mainimageAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );

            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'HTTP/1.1 200 OK',
                        'Content-Type: application/json'
                    )
                );
            }
        } 
    }
}