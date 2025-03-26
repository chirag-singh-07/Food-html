<?php
include 'config.php'; // Include database connection

header("Access-Control-Allow-Origin: *"); // Allow all origins (change * to specific frontend URL if needed)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    file_put_contents("debug.txt", print_r($data, true));

    $name = isset($data["name"]) ? trim($data["name"]) : "";
    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $password = isset($data["password"]) ? trim($data["password"]) : "";

    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode([ "success" => false, "message" => "All fields are required" ]);
        exit;
    }

    // Check if email already exists
    $checkEmailQuery = "SELECT id FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $checkEmailQuery);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode([ "success" => false, "message" => "Email already exists" ]);
        exit;
    }

    // Insert new user (storing password in plain text, not secure)
    $insertQuery = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

    if (mysqli_query($conn, $insertQuery)) {
        echo json_encode([ "success" => true, "message" => "Registration successful" ]);
    } else {
        echo json_encode([ "success" => false, "message" => "Registration failed" ]);
    }
}
?>