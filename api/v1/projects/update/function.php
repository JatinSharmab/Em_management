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

function updateUserProfile($jwt, $inputData,$projectId)
{
    global $conn;
    $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $user_id = $decoded->{'data'}->{'id'};

        $projectName = $inputData['project_name'];
        $projectTechnology = $inputData['project_technology'];
        $projectStatus = $inputData['project_status'];
        $projectLead = $inputData['project_lead'];
        $projectSt = $inputData['project_start_date'];
        $projectDead = $inputData['project_deadline_date'];
        $projectManager = $inputData['project_manager'];
        $projectClient = $inputData['project_client'];
        $projectManagementTool = $inputData['project_management_tool'];
        $projectManagementToolUrl = $inputData['project_management_tool_url'];
        $projectRepoTool = $inputData['project_repo_tool'];
        

        
        // Assuming $projectId is obtained from somewhere, like the URL or form data
        $sql = "UPDATE em_projects SET 
                    project_name = '$projectName',
                    project_technology = '$projectTechnology',
                    project_status = '$projectStatus',
                    project_lead = '$projectLead',
                    project_manager = '$projectManager',
                    project_client = '$projectClient',
                    project_start_date = '$projectSt',
                    project_deadline_date = '$projectDead',
                    project_management_tool = '$projectManagementTool',
                    project_management_tool_url = '$projectManagementToolUrl',
                    project_repo_tool = '$projectRepoTool'
                WHERE project_id = '$projectId'";
        

        if (mysqli_query($conn, $sql)) {
            $data = [
                'status' => 200,
                'message' => 'Profile updated successfully',
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