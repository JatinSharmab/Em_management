<?php
require '../../../connect.php';
// include '../../../vendor/autoload.php';
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

function getUserProfile($jwt)
{
    global $conn;


    $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";


    try {

        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));



        $user_id = $decoded->{'data'}->{'id'};
        $sql = "SELECT * FROM em_projects WHERE project_user_id='$user_id' AND project_deleted_at IS NULL";
        $user = [];

        $result = mysqli_query($conn, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            $user[] = $row;
        }


        if (!empty($user)) {
            $data = [
                'status' => 200,
                'message' => 'Projects details fetched successfully',
                // "jwt"=>$decoded,
                // // 'user' => [
                // //     'project_id' => $user['project_id'],
                // //     'user_project_id' => $user['user_project_id'],
                // //     'technology' => $user['project_technology'],
                // //     'project_name' => $user['project_name'],
                // //     'status' => $user['project_status'],

                // ]
                'data' => [$user]
            ];
            header("HTTP/1.0 200 OK");
            echo json_encode($data);
        } else {
            error422('User not found');
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
