<?php

class ProductController extends BaseController {

    /**
     * List products
     * GET /products/list?limit=[]&offset=[]
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

                $products = $productModel->getProducts($limit, $offset);
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

}