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
                $userModel->createUser($username, bcryptHash($password));
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
     * bcryptHash - Hash the password using the PHP's password_hash() function.
     * @param $password
     * @return string
     */
    private function bcryptHash($password) {
        $options = [
            'cost' => 10,
        ];
        return password_hash($password, PASSWORD_BCRYPT, $options);
    }

   
    private function decryptPassword($password) {
        $options = [
            'cost' => 10,
        ];
        return password_verify($password, PASSWORD_BCRYPT, $options);
    }
}