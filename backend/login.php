<?php
session_start();
include 'config.php';

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $email = isset($data["email"]) ? trim($data["email"]) : "";
    $password = isset($data["password"]) ? trim($data["password"]) : "";

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Email and password are required"]);
        exit;
    }

    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        if ($password === $user["password"]) { // Plain text check (not secure)
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["name"];
            $_SESSION["user_email"] = $user["email"];

            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => [
                    "id" => $user["id"],
                    "name" => $user["name"],
                    "email" => $user["email"]
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
}
?>
