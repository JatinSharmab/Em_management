<?php
require '../../../../connect.php';

function error422($message){
    $data = [
        'status' => 422,
        'message' => $message,

    ];
    header("HTTP/1.0 422 Unprocessible Entity");
    echo json_encode($data);
    exit;
} 

// echo $inputData['name'];
function storeUser($userInput)
{
    global $conn;
    $name = mysqli_real_escape_string($conn, $userInput['name']);
    $email = mysqli_real_escape_string($conn, $userInput['email']);
    $lastname = mysqli_real_escape_string($conn, $userInput['lastname']);


    $password = mysqli_real_escape_string($conn, $userInput['password']);
    $password = md5($password);
    if (empty(trim($name))) {
        return error422('Enter Your Name');
    }
    // INSERT INTO `em_projects` (`project_id`, `project_user_id`, `project_name`,
    //  `project_technology`, `project_status`, `project_created_at`, `project_deleted_at`
    //  , `project_updated_at`, `project_start_date`, `project_deadline_date`, 
    //  `project_lead`, `project_manager`, `project_client`, `project_management_tool`, 
    //  `project_management_tool_url`, `project_repo_tool`, `project_repo_url`, 
    //  `description`) VALUES 

    // $project_name = mysqli_real_escape_string($conn, $userInput['project_name']);
   

    // $project_technology = mysqli_real_escape_string($conn, $userInput['project_technology']);


    // $project_status = mysqli_real_escape_string($conn, $userInput['project_status']);

    // // $project_created_at = mysqli_real_escape_string($conn, $userInput['project_created_at']);

    // $project_start_date = mysqli_real_escape_string($conn, $userInput['project_start_date']);

    // $project_deadline_date = mysqli_real_escape_string($conn, $userInput['project_deadline_date']);

    // $project_lead = mysqli_real_escape_string($conn, $userInput['project_lead']);

    // $project_manager = mysqli_real_escape_string($conn, $userInput['project_manager']);

    // $project_client = mysqli_real_escape_string($conn, $userInput['project_client']);

    // $project_management_tool = mysqli_real_escape_string($conn, $userInput['project_management_tool']);

    // $project_management_tool_url = mysqli_real_escape_string($conn, $userInput['project_management_tool_url']);

    // $project_repo_tool = mysqli_real_escape_string($conn, $userInput['project_repo_tool']);
    // $project_repo_url = mysqli_real_escape_string($conn, $userInput['project_repo_url']);
    // $description = mysqli_real_escape_string($conn, $userInput['description']);
    
    else if (empty(trim($lastname))) {
        return error422('Enter Your lastname');
    } else if (empty(trim($email))) {
        return error422('Enter Your Email');
    } else if (empty(trim($password))) {
        return error422('Enter Your password');
    }else{
        // echo "=====1======";

        $sql = "INSERT INTO em_users (user_first_name,user_last_name,user_email,user_password) VALUES ('$name','$lastname','$email','$password')";
        // echo "=====2======";

        $result = mysqli_query($conn,$sql);
        // echo "=====3======";
        if($result){
            $data = [
                'status' => 201,
                'message' => 'User Created Successfully',
    
            ];
            header("HTTP/1.0 201 Created");
            echo json_encode($data);
        }else{
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
    
            ];
            header("HTTP/1.0 500 Method Not Allowed");
            echo json_encode($data);
        }
    }
}
?>