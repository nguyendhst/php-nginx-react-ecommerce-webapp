<?php

class BaseController {

    // magic methods. docs: https://www.php.net/manual/en/language.oop5.magic.php

    // magic call - called when invoking inaccessible methods in an object context.
    public function __call($name, $arguments) {
        
        // 404 Not Found
        $this->response('', 'HTTP/1.1 404 Not Found');
    }

    /**
     * Get URI segments
     * @return array
     */
    protected function getUriSegments() {
        $uri = $_SERVER['REQUEST_URI'];
        $uri = explode('?', $uri)[0];
        $uri = explode('/', $uri);
        return $uri;
    }

    /**
     * Get Query String
     * @return array
     */
    protected function getQueryParams() {
        $query = $_SERVER['QUERY_STRING'];
        parse_str($query, $queryArray);
        return $queryArray;
    }

    /**
     * Response Writer
     * @param mixed $data
     * @param array $headers
     */
    protected function responseWriter($data, $headers=array()) {
        foreach ($headers as $header) {
            header($header);
        }
        header_remove('Set-Cookie');
        header('Content-Type: application/json');
        echo json_encode($data);
    }


}