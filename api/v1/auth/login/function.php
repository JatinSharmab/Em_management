
<?php
require '../../../../connect.php';
include '../../../../vendor/autoload.php';

use \Firebase\JWT\JWT;

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

function signInUser($userInput)
{
    global $conn;
    $email = mysqli_real_escape_string($conn, $userInput['user_email']);
    $password = mysqli_real_escape_string($conn, $userInput['password']);
    $password = md5($password);
    if (empty(trim($email))) {
        error422('Enter Your Email');
    } else if (empty(trim($password))) {
        error422('Enter Your Password');
    } else {
        $sql = "SELECT * FROM em_users WHERE user_email = '$email' AND user_password = '$password'";
        $result = mysqli_query($conn, $sql);
        
        if (mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            $secret_key = "sfkjsdf34noj2jo5lbj3l6b1l3blb5l2bkjkjsdlf23bhj";
            $issuer_claim = "localhost";
            $audience_claim = "localhost";
            $issuedate_claim = time();
            $new_claim = $issuedate_claim;
            $expire_claim = $issuedate_claim + 100000;
            $token = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $new_claim,
                "exp" => $expire_claim,
                "data" => array(
                    'id' => $user['user_id'],
                    'firstname' => $user['firstname'],
                    'email' => $user['user_email']
                )
            );
            $jwt = JWT::encode($token, $secret_key, 'HS256');
            $data = [
                'status' => 200,
                'message' => 'Login Successful',
                'user' => [
                    'id' => $user['user_id'],
                    'name' => $user['user_first_name'],
                    'email' => $user['user_email'],
                ],
                'jwt'=> $jwt
            ];
            header("HTTP/1.0 200 OK");
            echo json_encode($data);

        
        } else {
            error422('Incorrect Username or Password');
        }
    }
}
?>
