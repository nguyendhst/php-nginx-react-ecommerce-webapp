<?php

// JWT
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once( PROJECT_ROOT . "/../vendor/autoload.php");



class UserController extends BaseController {



    /** 
     * List users
     * GET /api/users/list?limit=[]&offset=[]&role=[]
     * @return json
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
            // check admin privilege
            if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
                $this->responseWriter(array('error' => 'Authorization header not found'), array('HTTP/1.1 401 Unauthorized'));
                return;
            }
            if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
                $this->responseWriter(array('error' => 'Authorization header not found'), array('HTTP/1.1 401 Unauthorized'));
                return;
            }
            $jwt = $matches[1];
            try {
                $decoded = JWT::decode($jwt, new Key(JWT_SECRET, 'HS256'));
                if ($decoded->data->role !== 'Admin') {
                    $this->responseWriter(array('error' => 'Unauthorized'), array('HTTP/1.1 401 Unauthorized'), array('dump' => $decoded));
                    return;
                }
            } catch (Exception $e) {
                $this->responseWriter(
                    array('error' => 'Unauthorized', 'dump' => $e->getMessage()), 
                    array('HTTP/1.1 401 Unauthorized'));
                return;
            }
            try {
                $userModel = new UserModel();
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

                if (isset($queryParams['role']) && is_string($queryParams['role']) && $queryParams['role'] >= 0) {
                    $role = $queryParams['role'];
                } else {
                    $role = '';
                }

                $users = $userModel->getUsers($limit, $offset, $role);
                $res = json_encode($users, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

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
                        'Content-Type: application/json'
                    )
                );
            }
        }
    }

    /**
     * Create user account
     * POST /api/user/register
     * @return json
     */
    public function createAccountAction() {

        // error response
        $errStr ='';
        $errHeader ='';

        // get method
        $method = $_SERVER['REQUEST_METHOD'];
        // get query params
        $queryParams = $this->getQueryParams();
        if (strtoupper($method) !== 'POST') {
            $this->responseWriter(array('error' => 'Method not allowed'), array('HTTP/1.1 405 Method Not Allowed'));
            return;
        } else {
            try {
                $payload = json_decode(file_get_contents('php://input'), true);
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 400 Bad Request';
            }
            $username = $payload['username'];
            $password = $payload['password'];
            $role = "Customer";
            $lname = $payload['lname'];
            $fname = $payload['fname'];
            $email = $payload['email'];
            $phone = $payload['phone'];
            $yob = $payload['yob'];
            $data = [
                "role" => $role,
                "lname" => $lname,
                "fname" => $fname,
                "phone" => $phone,
                "email" => $email,
                "username" => $username,
                "password_hash" => $this->bhash($password),
                "yob" => $yob
            ];

            if (!validateUserData($data)) {
                $this->responseWriter(array('error' => 'Invalid data'), array('HTTP/1.1 400 Bad Request'));
                return;
            }

            try {
                $userModel = new UserModel();
                $user = $userModel->getUser($username);
                if (count($user) > 0) {
                    throw new Exception("Username already exists");
                }
                if ($userModel->createUser($data)) {
                    $res = json_encode(array('status' => 'success', 'message' => 'User created successfully'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                } else {
                    throw new Exception('User creation failed');
                }
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('createAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );
            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'Content-Type: application/json'
                    )
                );
            }
        }
    }

    /**
     * Authenticate user's login request
     * POST /users/login
     * @return array
     */

     public function loginAction() {

        // error response
        $errStr ='';
        $errHeader ='';

        // get method
        $method = $_SERVER['REQUEST_METHOD'];
        // get query params
        $queryParams = $this->getQueryParams();
        if (strtoupper($method) !== 'POST') {
            $this->responseWriter(array('error' => 'Method not allowed'), array('HTTP/1.1 405 Method Not Allowed'));
            return;
        } else {
            try {
                $payload = json_decode(file_get_contents('php://input'), true);
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 400 Bad Request';
            }
            $username = $payload['username'];
            $password = $payload['password'];
            
            // username must be alphanumeric and 5-20 characters long
            if (!preg_match('/^[a-zA-Z0-9]{5,20}$/', $username)) {
                $this->responseWriter(array('error' => 'Invalid username'), array('HTTP/1.1 400 Bad Request'));
                return;
            } else if (!preg_match('/^[a-zA-Z0-9]{5,20}$/', $password)) {
                $this->responseWriter(array('error' => 'Invalid password'), array('HTTP/1.1 400 Bad Request'));
                return;
            }

            try {
                $userModel = new UserModel();
                $user = $userModel->getUser($username);
                if (count($user) === 0) {
                    $this->responseWriter(array('error' => 'User does not exist'), array('HTTP/1.1 404 Not Found'));
                    return;
                }
                // if valiation succeed, generate a JWT token
                if ($this->bverify($password, $user[0]['password_hash'])) {
                    $token = array(
                        "iat" => time(),
                        "nbf" => time(),
                        "exp" => time() + 3600,
                        "data" => array(
                            "username" => $user[0]['username'],
                            "role" => $user[0]['role']
                        )
                    );
                    $jwt = JWT::encode($token, JWT_SECRET, 'HS256');
                    // returns token, role, user info
                    $res = json_encode(array(
                        'success' => 'User authenticated',
                        'token' => $jwt,
                        'user_info' => array(
                            'username' => $user[0]['username'],
                            'role' => $user[0]['role'],
                            'lname' => $user[0]['lname'],
                            'fname' => $user[0]['fname'],
                            'email' => $user[0]['email'],
                            'phone' => $user[0]['phone'],
                            'yob' => $user[0]['yob']
                        )

                    ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                } else {
                    $this->responseWriter(array('error' => 'User authentication failed'), array('HTTP/1.1 401 Unauthorized'));
                    return;
                }
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('authenticateAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );

            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'Content-Type: application/json'
                    )
                );
            }
        }
    }



    /* Get user info
     * GET /users/info
     * @return json
     */

    public function getUserInfoAction() {
            
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
            if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
                $this->responseWriter(array('error' => 'Authorization header not found'), array('HTTP/1.1 401 Unauthorized'));
                return;
            }
            // check if authorization header is set
            if (!preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
                $this->responseWriter(array('error' => 'Authorization header not found'), array('HTTP/1.1 401 Unauthorized'));
                return;
            }
            try {
                $jwt = $matches[1];
                $decoded = JWT::decode($jwt, new Key(JWT_SECRET, 'HS256'));
                $userModel = new UserModel();
                $user = $userModel->getUser($decoded->data->username);
                $res = json_encode(array('success' => 'User info', 'user' => $user));
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('getUserInfoAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );
            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'Content-Type: application/json'
                    )
                );
            }
        }
    }

    /**
     * Create Admin user
     * POST /users/admin
     * @return array
     */

    public function createAdminAction() {

        // error response
        $errStr ='';
        $errHeader ='';

        // get method
        $method = $_SERVER['REQUEST_METHOD'];
        // get query params
        $queryParams = $this->getQueryParams();
        if (strtoupper($method) !== 'POST') {
            $this->responseWriter(array('error' => 'Method not allowed'), array('HTTP/1.1 405 Method Not Allowed'));
            return;
        } else {
            try {
                $payload = json_decode(file_get_contents('php://input'), true);
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 400 Bad Request';
            }
            $username = $payload['username'];
            $password = $payload['password'];
            $role = "Admin";
            $lname = $payload['lname'];
            $fname = $payload['fname'];
            $email = $payload['email'];
            $phone = $payload['phone'];
            $yob = $payload['yob'];
            $data = array(
                'username' => $username,
                'password_hash' => $this->bhash($password),
                'role' => $role,
                'lname' => $lname,
                'fname' => $fname,
                'email' => $email,
                'phone' => $phone,
                'yob' => $yob
            );

            try {
                $userModel = new UserModel();
                $user = $userModel->getUser($username);
                if (count($user) > 0) {
                    $this->responseWriter(array('error' => 'User already exists'), array('HTTP/1.1 409 Conflict'));
                    return;
                }
                $userModel->createUser($data);
                $res = json_encode(array('success' => 'User created'));
            } catch (Exception $e) {
                $errStr = $e->getMessage();
                $errHeader = 'HTTP/1.1 500 Internal Server Error';
            }

            // response
            if ($errStr) {
                $this->responseWriter(
                    json_encode(array('createAdminAction_error' => $errStr)), 
                    array(
                        $errHeader,
                        'Content-Type: application/json'
                    )
                );
            } else {
                $this->responseWriter(
                    $res,
                    array(
                        'Content-Type: application/json'
                    )
                );
            }
        }
    }

    /**
     * bcryptHash - Hash the password using the PHP's password_hash() function.
     * @param $password
     * @return string
     */
    private function bhash($password) {
        $options = [
            'cost' => 10,
        ];
        return password_hash($password, PASSWORD_BCRYPT, $options);
    }

   
    private function bverify($password, $hash) {
        return password_verify($password, $hash);
    }

    public function validateUserData($data) {
        // username must be alphanumeric and between 5-20 characters
        if (!preg_match('/^[a-zA-Z0-9]{5,20}$/', $data['username'])) {
            return false;
        }
        // password must be alphanumeric and between 5-20 characters
        if (!preg_match('/^[a-zA-Z0-9]{5,20}$/', $data['password'])) {
            return false;
        }
        // email must be valid
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        // phone must be valid
        if (!preg_match('/^[0-9]{12}$/', $data['phone'])) {
            return false;
        }
        // last name must be alphanumeric and between 2-20 characters
        if (!preg_match('/^[a-zA-Z0-9]{2,20}$/', $data['lname'])) {
            return false;
        }
        // first name must be alphanumeric and between 2-20 characters
        if (!preg_match('/^[a-zA-Z0-9]{2,20}$/', $data['fname'])) {
            return false;
        }
        // year of birth must be valid
        if (!preg_match('/^[0-9]{4}$/', $data['yob'])) {
            return false;
        }
        return true;

    }
}