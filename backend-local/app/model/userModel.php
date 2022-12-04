<?php

require_once PROJECT_ROOT . "/model/database.php";

class UserModel extends AccountDatabase {
    
    public function getUser($username) {
        $query = "SELECT `role`, `lname`, `fname`, `phone`, `email`, `yob`, `username` FROM `Users` WHERE `username` = ?;";
        $params = [
            "s",
            $username
        ];
        return $this->select($query, $params);
    }

    public function createUser($data) {
        $query = "INSERT INTO `Users` (`role`, `lname`, `fname`, `phone`, `email`, `username`, `password_hash`, `yob`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        $params = [
            "sssssssi",
            $data["role"],
            $data["lname"],
            $data["fname"],
            $data["phone"],
            $data["email"],
            $data["username"],
            $data["password_hash"],
            $data["yob"]
        ];
        return $this->insert($query, $params);
    }

    public function updateUser($username, $password_hash) {
        $query = "UPDATE `Users` SET `password` = ? WHERE `username` = ?;";
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