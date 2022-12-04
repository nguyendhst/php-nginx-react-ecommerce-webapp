<?php

/**
 * Entry point for the application
 */
 
require __DIR__ . "/../util/bootstrap.php";

require PROJECT_ROOT . '/controller/api/productController.php';


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$routes = [
    "products" => "ProductController",
    "users" => "UserController"
];

$actions = [
    'list' => 'listAction',
    'images' => 'imagesAction',
    'mainimage' => 'mainimageAction',
    'authenticate' => 'authenticateAction',
];

// redirect
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// endpoints start with /api
if (!isset($uri[1]) || $uri[1] !== 'api') {
    // 404 Not Found
    header('HTTP/1.1 404 Not Found');
    return;
}

if (!isset($uri[2]) || !isset($routes[$uri[2]])) {
    // 404 Not Found
    header('HTTP/1.1 404 Not Found');
    return;
}

// get action name
$actionName = $actions[$uri[3]] ?? '';

if (!$actionName) {
    // 404 Not Found
    header('HTTP/1.1 404 Not Found');
    return;
}

// instantiate controller
$controller = new $routes[$uri[2]]();

// call method
$controller->$actionName();






