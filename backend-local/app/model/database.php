<?php


class ProductDatabase {

    // conn is the connection to the database
    protected $conn = null;
    public $dbname = PRODUCTS_DB_NAME;

    // constructor to connect to the database
    public function __construct() {
        try {
            $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, $this->dbname);

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



class AccountDatabase {
    
    // conn is the connection to the database
    protected $conn = null;
    public $dbname = USER_DB_NAME;

    // constructor to connect to the database
    public function __construct() {
        try {
            $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, $this->dbname);

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

    // insert is a function to insert data into the database
    public function insert($query="", $params=[]) {
        try {
            $stmt = $this->executeQuery($query, $params);
            $stmt->close();
            return $this->conn->insert_id;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    // update is a function to update data in the database
    public function update($query="", $params=[]) {
        try {
            $stmt = $this->executeQuery($query, $params);
            $stmt->close();
            return $this->conn->affected_rows;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
            
}