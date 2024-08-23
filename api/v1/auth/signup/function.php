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