<?php
include 'config.php';

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    echo json_encode([ "success" => false, "message" => "Invalid request" ]);
    exit;
}

parse_str(file_get_contents("php://input"), $_DELETE);
$id = $_DELETE['id'] ?? null;

if (!$id) {
    echo json_encode([ "success" => false, "message" => "Product ID is required" ]);
    exit;
}

$query = "DELETE FROM food_items WHERE id = '$id'";
if (mysqli_query($conn, $query)) {
    echo json_encode([ "success" => true, "message" => "Product deleted" ]);
} else {
    echo json_encode([ "success" => false, "message" => "Failed to delete product" ]);
}
?>