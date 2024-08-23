<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');
header('Access-Control-Max-Age: 86400');


if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

include('function.php');
// include "../"
$req = $_SERVER["REQUEST_METHOD"];

if ($req == 'OPTIONS') {
    
    header("HTTP/1.1 204 No Content");
    exit;
}

if ($req == 'GET') {
    $headers = apache_request_headers();
    // echo $headers;
    if (!isset($headers['Authorization']) || empty(($headers['Authorization']))) {
        
        error422('Token not provided');
    } 
    // echo "====1===========";
        $authHeader = $headers['Authorization'];
        $jwtToken = explode(' ', $authHeader)[1];
        // $arr = explode(" ", $authHeader);
        // $jwt = $arr[1];

         getUserProfile($jwtToken);
        //  echo "====2===========";
    
} else {
    $data = [
        'status' => 405,
        'message' => $req . ' Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);

    // echo "====3===========";
}
?>
