<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from frontend
header("Content-Type: application/json");
include 'config.php';

$query = "SELECT id, name, price, category, image FROM food_items"; // Use your actual table name
$result = $conn->query($query);

if (!$result) {
    echo json_encode([ "success" => false, "message" => "Database query failed" ]);
    exit;
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

if (empty($products)) {
    echo json_encode([ "success" => false, "message" => "No products found" ]);
} else {
    echo json_encode($products);
}

$conn->close();
?>