<?php
require '../../../connect.php';
include '../../../vendor/autoload.php';



function error404($message)
{
    $data = [
        'status' => 404,
        'message' => $message,
    ];
    header("HTTP/1.0 404 Not Found");
    echo json_encode($data);
    exit;
}

function error500($message)
{
    $data = [
        'status' => 500,
        'message' => $message,
    ];
    header("HTTP/1.0 500 Internal Server Error");
    echo json_encode($data);
    exit;
}

function fetchCities()
{
    global $conn;

    try {
        $inputData = json_decode(file_get_contents("php://input"), true);

        if (empty($inputData['user_state'])) {
            error404("State is required");
        }

        $state_name = $inputData['user_state'];
        $sql = "SELECT state_id FROM em_states WHERE state_name='$state_name'";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) <= 0) {
            error404("State Not Found");
        }

        $row = mysqli_fetch_assoc($res);
        $state_id = $row['state_id'];

        $fetch_city = "SELECT city_id, city_name FROM em_cities WHERE state_id='$state_id'";
        $fetch_city_execute = mysqli_query($conn, $fetch_city);

        if (!$fetch_city_execute) {
            error500("Database query failed");
        }

        $value = mysqli_fetch_all($fetch_city_execute, MYSQLI_ASSOC);

        $data = [
            "status" => true,
            "message" => "Cities fetched Successfully",
            "data" => $value
        ];
        header("HTTP/1.0 200 OK");
        echo json_encode($data);
    } catch (Exception $ex) {
        error500($ex->getMessage());
    }
}
?>
