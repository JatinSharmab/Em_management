<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Authorization, Content-Type');
header('Access-Control-Max-Age: 86400');

if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

include('function.php');
$req = $_SERVER["REQUEST_METHOD"];

if ($req == 'OPTIONS') {
    // Handle preflight request
    header("HTTP/1.1 204 No Content");
    exit;
}

if ($req == 'PUT') {
    $headers = apache_request_headers();
    if (!isset($headers['Authorization']) || empty($headers['Authorization'])) {
        error422('Token not provided');
    }

    $authHeader = $headers['Authorization'];
    $jwtToken = explode(' ', $authHeader)[1];

    // Fetch the raw data from the PUT request
    $inputData = json_decode(file_get_contents("php://input"), true);

    updateUserProfile($jwtToken, $inputData);

} else {
    $data = [
        'status' => 405,
        'message' => $req . ' Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
?>
