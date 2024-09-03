<?php
require '../../../connect.php';
require "/var/www/html/em_management/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function error422($message) {
    $data = [
        'status' => 422,
        'message' => $message,
    ];
    header("HTTP/1.0 422 Unprocessable Entity");
    echo json_encode($data);
    exit;
} 

function storeUser($jwtToken,$userInput) {
    global $conn;
    $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";
    $decoded = JWT::decode($jwtToken, new Key($secret_key, 'HS256'));
    
    $user_id = $decoded->{'data'}->{'id'};
        // echo $user_id;
    $project_name = mysqli_real_escape_string($conn, $userInput['project_name']);
    $project_technology = mysqli_real_escape_string($conn, $userInput['project_technology']);
    $project_status = mysqli_real_escape_string($conn, $userInput['project_status']);
    $project_start_date = mysqli_real_escape_string($conn, $userInput['project_start_date']);
    $project_deadline_date = mysqli_real_escape_string($conn, $userInput['project_deadline_date']);
    $project_lead = mysqli_real_escape_string($conn, $userInput['project_lead']);
    $project_manager = mysqli_real_escape_string($conn, $userInput['project_manager']);
    $project_client = mysqli_real_escape_string($conn, $userInput['project_client']);
    $project_management_tool = mysqli_real_escape_string($conn, $userInput['project_management_tool']);
    $project_management_tool_url = mysqli_real_escape_string($conn, $userInput['project_management_tool_url']);
    $project_repo_tool = mysqli_real_escape_string($conn, $userInput['project_repo_tool']);
    $project_repo_url = mysqli_real_escape_string($conn, $userInput['project_repo_url']);
    $description = mysqli_real_escape_string($conn, $userInput['description']);

    if (empty(trim($project_name))) {
        return error422('Enter the Project Name');
    } else if (empty(trim($project_technology))) {
        return error422('Enter the Project Technology');
    } else if (empty(trim($project_status))) {
        return error422('Enter the Project Status');
    } else if (empty(trim($project_lead))) {
        return error422('Enter the Project Lead');
    }

    // $project_created_at = timestamp();  

    $sql = "INSERT INTO `em_projects` (`project_user_id`,`project_name`, `project_technology`, `project_status`,`project_start_date`,`project_deadline_date`, `project_lead`, `project_manager`, `project_client`, `project_management_tool`, `project_management_tool_url`, `project_repo_tool`, `project_repo_url`, `description`) VALUES ('$user_id','$project_name','$project_technology','$project_status','$project_start_date','$project_deadline_date','$project_lead','$project_manager','$project_client','$project_management_tool','$project_management_tool_url','$project_repo_tool','$project_repo_url','$description')"; 

    $result = mysqli_query($conn, $sql);
    if ($result) {
        $data = [
            'status' => 201,
            'message' => 'Project Created Successfully',
        ];
        header("HTTP/1.0 201 Created");
        echo json_encode($data);
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error: ' . mysqli_error($conn),
        ];
        header("HTTP/1.0 500 Internal Server Error");
        echo json_encode($data);
    }
}

?>