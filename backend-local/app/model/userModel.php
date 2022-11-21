<?php

require_once PROJECT_ROOT . "/model/database.php";

class UserModel extends AccountDatabase {
    
    public function getUser($username) {
        $query = "SELECT * FROM users WHERE username = ?;";
        $params = [
            "s",
            $username
        ];
        return $this->select($query, $params);
    }

    public function createUser($username, $password_hash) {
        $query = "INSERT INTO users (username, password) VALUES (?, ?);";
        $params = [
            "ss",
            $username,
            $password_hash
        ];
        return $this->insert($query, $params);
    }

    public function updateUser($username, $password_hash) {
        $query = "UPDATE users SET password = ? WHERE username = ?;";
        $params = [
            "ss",
            $password_hash,
            $username
        ];
        return $this->update($query, $params);
    }

    public function deleteUser($username) {
        $query = "DELETE FROM users WHERE username = ?;";
        $params = [
            "s",
            $username
        ];
        return $this->delete($query, $params);
    }

}