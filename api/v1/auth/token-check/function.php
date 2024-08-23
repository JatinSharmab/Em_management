<?php
require '../../../../connect.php';
require "/var/www/html/em_management/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function sendResponse($status, $message) {
    $data = [
        'status' => $status,
        'message' => $message,
    ];
    header("HTTP/1.0 $status");
    echo json_encode($data);
    exit;
}
function error422($message)
{
    $data = [
        'status' => 422,
        'message' => $message,
    ];
    header("HTTP/1.0 422 Unprocessable Entity");
    echo json_encode($data);
    exit;
}

function getUserProfile($jwt) {
    global $conn;

  
    
    $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $user_id = $decoded->{'data'}->{'id'};

        $sql = "SELECT * FROM em_users WHERE user_id = '$user_id'";
        $result = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result) > 0) {
            sendResponse(200, 'Token is valid');
        } else {
            sendResponse(422, 'Invalid Token');
        }
    } catch (Exception $e) {
        sendResponse(401, 'Access denied. ' . $e->getMessage());
    }
}
?>
