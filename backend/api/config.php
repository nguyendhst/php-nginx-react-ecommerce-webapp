<?php
    $conn = new mysqli("127.0.0.1","root","","post");
    if (!$conn) {
        die('Could not connect: ' . mysql_error());
    }
?>