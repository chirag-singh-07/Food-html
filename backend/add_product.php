<?php
session_start();
include 'config.php';

header("Content-Type: application/json");

// Check if request method is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([ "success" => false, "message" => "Invalid request" ]);
    exit;
}

// Validate input fields
if (!isset($_FILES["image"]) || empty($_POST["name"]) || empty($_POST["price"]) || empty($_POST["category"])) {
    echo json_encode([ "success" => false, "message" => "All fields are required" ]);
    exit;
}

$name = mysqli_real_escape_string($conn, $_POST["name"]);
$price = floatval($_POST["price"]);
$category = mysqli_real_escape_string($conn, $_POST["category"]);

// Ensure the uploads directory exists
$targetDir = "uploads/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Handle image upload
$image = $_FILES["image"];
$imageName = time() . "_" . basename($image["name"]);
$targetFilePath = $targetDir . $imageName;

if (!move_uploaded_file($image["tmp_name"], $targetFilePath)) {
    echo json_encode([ "success" => false, "message" => "Image upload failed" ]);
    exit;
}

$imagePath = "http://localhost/food_api/backend/uploads/" . $imageName;

// Insert into database (including category)
$query = "INSERT INTO food_items (name, price, category, image) VALUES ('$name', '$price', '$category', '$imagePath')";

if (mysqli_query($conn, $query)) {
    echo json_encode([ "success" => true, "message" => "Product added successfully" ]);
} else {
    echo json_encode([ "success" => false, "message" => "Database error: " . mysqli_error($conn) ]);
}
?>