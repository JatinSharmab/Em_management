<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Authorization, Content-Type');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); 
}

include('function.php');

$req = $_SERVER["REQUEST_METHOD"];

if ($req === 'GET') {
    $headers = apache_request_headers();

    if (!isset($headers['Authorization']) || empty($headers['Authorization'])) {
        error422('Token not provided');
    } else {
        $authHeader = $headers['Authorization'];
        $jwtToken = explode(' ', $authHeader)[1];

        getUserProfile($jwtToken);
    }
} else {
    $data = [
        'status' => 405,
        'message' => $req . ' Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
?>
