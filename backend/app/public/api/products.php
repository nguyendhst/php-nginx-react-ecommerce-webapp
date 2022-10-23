<?php

// products.php - API endpoint for products

// include bootstrap file
require __DIR__ . '/../../util/bootstrap.php';

// include product controller file
require PROJECT_ROOT . '/controller/api/productController.php';

// set headers
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");

// entry point

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// endpoints start with /api

if (!isset($uri[1]) || $uri[1] !== 'api') {
    // 404 Not Found
    $this->response(array('error' => '404 Not Found'), 'HTTP/1.1 404 Not Found');
    return;
}

// all actions

$actions = [
    'list' => 'listAction'
];

// get action name

$actionName = $actions[$uri[3]] ?? '';

if (!$actionName) {
    // 404 Not Found
    $this->response('', 'HTTP/1.1 404 Not Found');
    return;
}

// instantiate controller

$controller = new ProductController();

// call method

$controller->$actionName();


