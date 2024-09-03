<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Authorization, Content-Type');
header('Access-Control-Max-Age: 86400');

if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}


$req = $_SERVER["REQUEST_METHOD"];

if ($req == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

if ($req == 'GET') {
include('project_listing.php');

    $headers = getallheaders();

    if (!isset($headers['Authorization']) || empty($headers['Authorization'])) {
        error422('Token not provided');
    }

    $authHeader = $headers['Authorization'];
    $authParts = explode(' ', $authHeader);

    if (count($authParts) !== 2 || $authParts[0] !== 'Bearer') {
        error422('Invalid Authorization Header Format');
    }

    $jwtToken = $authParts[1];
    getUserProfile($jwtToken);
} else if ($req == 'POST') {
    include('add_project.php');
    $headers = apache_request_headers();
    if (!isset($headers['Authorization']) || empty($headers['Authorization'])) {
        error422('Token not provided');
    }

    $authHeader = $headers['Authorization'];
    $jwtToken = explode(' ', $authHeader)[1];

    $inputData = json_decode(file_get_contents("php://input"), true);
    
        
        $storeUser = storeUser($jwtToken,$inputData);

    
    echo $storeUser;

} else {
    $data = [
        'status' => 405,
        'message' => $req . 'Method Not Allowed',

    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}

?>
