<?php

define("PROJECT_ROOT", __DIR__ . "/..");

// include config file
require_once PROJECT_ROOT . "/util/config.php";

// include model files
require_once PROJECT_ROOT . "/model/productModel.php";
require_once PROJECT_ROOT . "/model/userModel.php";

//include base controller file
require_once PROJECT_ROOT . "/controller/api/baseController.php";