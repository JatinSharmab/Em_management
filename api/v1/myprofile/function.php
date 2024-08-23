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
        
        $decoded = JWT::decode($jwt, new Key($secret_key,'HS256'));
    
        

        $user_id = $decoded->{'data'}->{'id'};
        $sql = "SELECT user_id, user_first_name,user_last_name, user_email, user_mobile, user_gender, user_city_id,user_state_id, user_country_id FROM em_users WHERE user_id = '$user_id'";
        
        $result = mysqli_query($conn, $sql);
        $user = mysqli_fetch_assoc($result);
        $cn = $user['user_country_id'];
        $state = $user['user_state_id'];
        $city = $user['user_city_id'];
        $sql1 = "SELECT * FROM em_countries WHERE  country_id = '$cn'";
        $sql2 = "SELECT * FROM em_states WHERE state_id = '$state'";
        $sql3 = "SELECT * FROM em_cities WHERE city_id = '$city'";
        
        $result1 = mysqli_query($conn,$sql1);
        $row1=mysqli_fetch_assoc($result1);
        $result2 = mysqli_query($conn,$sql2);
        $row2=mysqli_fetch_assoc($result2);
        $result3 = mysqli_query($conn,$sql3);
        $row3=mysqli_fetch_assoc($result3);
        
        if (mysqli_num_rows($result) > 0) {
            $data = [
                'status' => 200,
                'message' => 'Profile fetched successfully',
                // "jwt"=>$decoded,
                'user' => [
                    'id' => $user['user_id'],
                    'firstname' => $user['user_first_name'],
                    'lastname' => $user['user_last_name'],
                    'email' => $user['user_email'],
                    'mobile' => $user['user_mobile'],
                    'gender' => $user['user_gender'],
                    'city' => $row3['city_name'],
                    'state' => $row2['state_name'],
                    'country' => $row1['country_name']
                ]
            ];
            header("HTTP/1.0 200 OK");
            echo json_encode($data);
        }
         else {
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
?>
