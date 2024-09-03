<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Authorization, Content-Type');
header('Access-Control-Max-Age: 86400');

if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

// Include n;ecessary files
include('function.php');

// Get request method
$req = $_SERVER["REQUEST_METHOD"];

// Authorization check
$headers = apache_request_headers();
if (!isset($headers['Authorization']) || empty($headers['Authorization'])) {
    error422('Token not provided');
    exit;
}

$authHeader = $headers['Authorization'];
$jwtToken = explode(' ', $authHeader)[1]; // Assuming "Bearer <token>"

// Route and method handling
if ($req === 'GET') {
    if (isset($_GET['id'])) {
        $projectId = $_GET['id'];
        getUserProfile($jwtToken, $projectId);
    } else {
        error422('Project ID not provided');
    }
} else if ($req === 'PUT') {
    // Handle PUT request for updating a project here
} else {
    // Method not allowed
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode([
        'status' => 405,
        'message' => $req . ' Method Not Allowed',
    ]);
    exit;
}
?>
