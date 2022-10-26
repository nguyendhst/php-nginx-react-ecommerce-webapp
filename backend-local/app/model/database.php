<?php


class Database {

    // conn is the connection to the database
    protected $conn = null;

    // constructor to connect to the database
    public function __construct() {
        try {
            $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

            if ($this->conn->connect_error) {
                die("Connection failed: " . $this->conn->connect_error);
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    // executeQuery is a function to execute a query
    private function executeQuery($query="", $params=[]) {
        try {
            $stmt = $this->conn->prepare($query);
            if ($stmt === false) {
                throw new Exception($this->conn->error);
            }
            if ($params) {
                $ok = $stmt->bind_param($params[0], ...array_slice($params, 1));
                if ($ok === false) {
                    throw new Exception($stmt->error);
                }
            }
            
            $stmt->execute();
            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    // select is a function to select data from the database
    public function select($query="", $params=[]) {
        try {
            $stmt = $this->executeQuery($query, $params);
            $result = $stmt->get_result();
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $stmt->close();
            return $data;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

}
    