<?php
require '../../../connect.php';

function error422($message){
    $data = [
        'status' => 422,
        'message' => $message,

    ];
    header("HTTP/1.0 422 Unprocessible Entity");
    echo json_encode($data);
    exit;
} 

// // echo $inputData['name'];
// function storeUser($userInput)
// {
//     global $conn;
//     $name = mysqli_real_escape_string($conn, $userInput['name']);
//     $email = mysqli_real_escape_string($conn, $userInput['email']);

//     $phone = mysqli_real_escape_string($conn, $userInput['phone']);
//     if (empty(trim($name))) {
//         return error422('Enter Your Name');
//     } else if (empty(trim($email))) {
//         return error422('Enter Your Email');
//     } else if (empty(trim($phone))) {
//         return error422('Enter Your Phone');
//     }else{
//         $sql = "INSERT INTO em_users (user_first_name,user_email,user_mobile) VALUES ('$name','$email','$phone')";
//         $result = mysqli_query($conn,$sql);
//         if($result){
//             $data = [
//                 'status' => 201,
//                 'message' => 'User Created Successfully',
    
//             ];
//             header("HTTP/1.0 201 Created");
//             echo json_encode($data);
//         }else{
//             $data = [
//                 'status' => 500,
//                 'message' => 'Internal Server Error',
    
//             ];
//             header("HTTP/1.0 500 Method Not Allowed");
//             echo json_encode($data);
//         }
//     }
// }

function getuserList()
{
    global $conn;
    $sql = "SELECT * FROM em_users";
    $query_run = mysqli_query($conn, $sql);

    if ($query_run) {
        if (mysqli_num_rows($query_run) > 0) {
            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
            $data = [
                'status' => 200,
                'message' => 'Customer List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Customer Found',

            ];
            header("HTTP/1.0 404 No Customer Found.");
            echo json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',

        ];
        header("HTTP/1.0 500 Method Not Allowed");
        echo json_encode($data);
    }
}
