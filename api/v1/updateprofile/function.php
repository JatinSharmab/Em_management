<?php
require '../../../connect.php';
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

        $firstname = $inputData['firstname'];
        $lastname = $inputData['lastname'];
        $email = $inputData['email'];
        $mobile = $inputData['mobile'];
        $gender = $inputData['gender'];
        $city = $inputData['city'];
        $state = $inputData['state'];
        $country = $inputData['country'];
        $sql1 = "SELECT * FROM em_countries WHERE  country_name = '$country'";
        $result1 = mysqli_query($conn,$sql1);
        $row1=mysqli_fetch_assoc($result1);
        $cn = $row1['country_id'];
        $sql2 = "SELECT * FROM em_states WHERE  state_name = '$state'";
        $result2 = mysqli_query($conn,$sql2);
        $row2=mysqli_fetch_assoc($result2);
        $st = $row2['state_id'];
        $sql3 = "SELECT * FROM em_cities WHERE  city_name = '$city'";
        $result3 = mysqli_query($conn,$sql3);
        $row3=mysqli_fetch_assoc($result3);
        $ci = $row3['city_id'];
        $sql = "UPDATE em_users SET 
                user_first_name = '$firstname',
                user_last_name = '$lastname',
                user_email = '$email',
                user_mobile = '$mobile',
                user_gender = '$gender',
                user_city_id = '$ci',
                user_state_id = '$st',
                user_country_id = '$cn'
                WHERE user_id = '$user_id'";

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