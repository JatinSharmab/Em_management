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

function getUserProfile($jwt, $projectId)
{
    global $conn;

    $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));

        $sql = "SELECT * FROM em_projects WHERE project_id='$projectId'";

        $query = mysqli_query($conn, $sql);
        if (!$query) {
            error422('Failed to fetch project');
        }

        $user = mysqli_fetch_assoc($query);

        $data = [
            'status' => 200,
            'data' => $user,
            'message' => 'Project details fetched successfully',
        ];
        header("HTTP/1.0 200 OK");
        echo json_encode($data);
        exit;
    } catch (Exception $e) {
        error422($e->getMessage());
    }
}
?>
