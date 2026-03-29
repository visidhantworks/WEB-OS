<?php
session_start();

// Database connection
$host = 'localhost';
$db = 'myos';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else 
{
    echo "connceted";
}

// Get submitted username and pin
$username = $_POST['username'] ?? '';
$pin = $_POST['pin'] ?? '';

if (!empty($username) && !empty($pin)) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND pin = ?");
    $stmt->bind_param("ss", $username, $pin);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: ../desktop");
        exit();
    } else {
        echo "Invalid Username or PIN!";
    }
}