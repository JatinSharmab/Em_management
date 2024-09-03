<?php
// Display all errors for debugging purposes
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and preflight requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Authorization, Content-Type');
header('Access-Control-Max-Age: 86400');

// Handle OPTIONS preflight requests
if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    header("HTTP/1.1 204 No Content");
    exit();
}

include('function.php');

// Determine the request method
$req = $_SERVER["REQUEST_METHOD"];

if ($req == 'POST') {
    // Decode the JSON input into an associative array
    $inputData = json_decode(file_get_contents("php://input"), true);

    // Check if input data is empty or not an array
    if (!empty($inputData)) {
        softDeleteProject($inputData);
    } else {
        // Handle the case where input data is missing or empty
        error422('Input data is missing or invalid.');
    }
} else {
    // Respond with a 405 Method Not Allowed if the request method is not POST
    $data = [
        'status' => 405,
        'message' => $req . ' Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
?>
