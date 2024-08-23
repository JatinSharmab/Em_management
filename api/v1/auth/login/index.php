<?php
// header('Access-Control-Allow-Origin:*');
// header('Content-Type: application/json');
// header('Access-Control-Allow-Method: POST');
// header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,X-Request-With');
// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');

// Exit early so the page isn't fully loaded for options requests
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

if ($req == 'POST') {
    $inputData = json_decode(file_get_contents("php://input"), true);
    if (empty($inputData)) {
        signInUser($_POST);
    } else {
        signInUser($inputData);
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
