<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    require_once 'config.php';

    // print_r(file_get_contents('php://input'));

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case "GET":
            $sql = "SELECT id, title, description, image FROM post_table";
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[3]) && is_numeric($path[3])) {
                $sql = "SELECT * FROM post_table WHERE id = $path[3]";
                $result = $conn -> query($sql);
                $row = $result -> fetch_all(MYSQLI_ASSOC);
            }
            else{
                $result = $conn -> query($sql);
                $row = $result -> fetch_all(MYSQLI_ASSOC);
            }
            echo json_encode($row);
            break;
        case "POST":

            $post = json_decode(file_get_contents('php://input'));
            $create_at = date('Y-m-d');
            $sql = "INSERT INTO post_table
            (id, title, description, content, create_at) VALUES
            (null,'$post->title','$post->description','$post->data','$create_at')";
             
            if(mysqli_query($conn, $sql)){
                $response = ['message' => "Successfully"];
            }
            else{
                $response = ['message' => "Failed"];
            }
            echo json_encode($response);
            break;
        case "PUT":
            $post = json_decode(file_get_contents('php://input'));
            $create_at = date('Y-m-d');
            $sql = "UPDATE post_table SET title='$post->title', description='$post->description',
            content='$post->data' WHERE id=$post->id";
             
            if(mysqli_query($conn, $sql)){
                $response = ['message' => "Successfully"];
            }
            else{
                $response = ['message' => "Failed"];
            }
            echo json_encode($response);
            break;
        case "DELETE":
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if(isset($path[3]) && is_numeric($path[3])) {
                $sql = "DELETE FROM post_table WHERE id = $path[3]";
                if(mysqli_query($conn, $sql)){
                    $response = ['message' => "Successfully"]; 
                }
                else{
                    $response = ['message' => "Failed"];
                }
            }
            break;

    }



?>