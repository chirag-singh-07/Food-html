<?php
$host = "localhost";
$user = "root";  // Change if you have a database username
$pass = "";      // Change if you have a database password
$dbname = "foodie";

// Connect to MySQL
$conn = new mysqli($host, $user, $pass, $dbname);

// Check Connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>