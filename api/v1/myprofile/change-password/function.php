<?php
require '../../../../connect.php';
require "/var/www/html/em_management/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

function updateUserProfile($jwt, $inputData)
{
    global $conn;
    $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $user_id = $decoded->{'data'}->{'id'};

        $newPassword = $inputData['newPassword'];
        $comfirmPassword = $inputData['comfirmPassword'];
        $newPassword = md5($newPassword);
        $sql = "UPDATE em_users SET 
                user_password = '$newPassword'
                WHERE user_id = '$user_id'";

        if (mysqli_query($conn, $sql)) {
            $data = [
                'status' => 200,
                'message' => 'Password changed successfully',
            ];
            header("HTTP/1.0 200 OK");
            echo json_encode($data);
        } else {
            error422('Profile update failed');
        }
    } catch (Exception $e) {
        $data = [
            'status' => 401,
            'message' => 'Access denied. ' . $e->getMessage(),
        ];
        header("HTTP/1.0 401 Unauthorized");
        echo json_encode($data);
    }
}
?>