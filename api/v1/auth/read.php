<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization,X-Request-With');
include('function.php');

$req = $_SERVER["REQUEST_METHOD"];

if($req == "GET"){
    $userList = getuserList();
    echo $userList;
}else{
    $data = [
        'status' => 505,
        'message' => $req.'Method Not Allowed',

    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}

?>