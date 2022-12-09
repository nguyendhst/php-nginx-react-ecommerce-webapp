<?php

require_once PROJECT_ROOT . "/model/database.php";

class UserModel extends AccountDatabase {

    public function getAllUsers() {
        $query = "SELECT `role`, `lname`, `fname`, `phone`, `email`, `yob`, `username` FROM `Users`;";
        $params = [];
        return $this->select($query, $params);
    }
    
    public function getUser($username) {
        $query = "SELECT `role`, `lname`, `fname`, `phone`, `email`, `yob`, `username`, `password_hash` FROM `Users` WHERE `username` = ?;";
        $params = [
            "s",
            $username
        ];
        return $this->select($query, $params);
    }

    public function getUsers($limit, $offset, $role) {
        // if role is empty string, then get all users
        if ($role === "") {
            $query = "SELECT `role`, `lname`, `fname`, `phone`, `email`, `yob`, `username` FROM `Users` LIMIT ? OFFSET ?;";
            $params = [
                "ii",
                $limit,
                $offset
            ];
        } else {
            $query = "SELECT `role`, `lname`, `fname`, `phone`, `email`, `yob`, `username` FROM `Users` WHERE `role` = ? LIMIT ? OFFSET ?;";
            $params = [
                "sii",
                $role,
                $limit,
                $offset
            ];
        }
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