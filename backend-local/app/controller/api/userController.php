<?php

class UserController extends BaseController {

    /**
     * Create user account
     * @param $username
     * @param $password
     * @return array
     */

    public function createAction($username, $password) {

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
                $userModel = new UserModel();
                $user = $userModel->getUser($username);
                if (count($user) > 0) {
                    $this->responseWriter(array('error' => 'User already exists'), array('HTTP/1.1 409 Conflict'));
                    return;
                }
                $userModel->createUser($username, $this->bhash($password));
                $res = json_encode(array('success' => 'User created'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
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
     * Authenticate user
     * @param $username
     * @param $password
     * @return array
     */

     public function authenticateAction($username, $password) {

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
                $userModel = new UserModel();
                $user = $userModel->getUser($username);
                if (count($user) === 0) {
                    $this->responseWriter(array('error' => 'User does not exist'), array('HTTP/1.1 404 Not Found'));
                    return;
                }
                if ($this->bverify($password, $user[0]['password'])) {
                    $res = json_encode(array('success' => 'User authenticated'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
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
}