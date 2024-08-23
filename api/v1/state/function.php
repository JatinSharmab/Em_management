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

function fetchStates()
{
    global $conn;

    try {
        $inputData = json_decode(file_get_contents("php://input"), true);

        if (empty($inputData['user_country'])) {
            error404("Country is required");
        }

        $country_name = $inputData['user_country'];
        $sql = "SELECT country_id FROM em_countries WHERE country_name='$country_name'";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) <= 0) {
            error404("Country Not Found");
        }

        $row = mysqli_fetch_assoc($res);
        $country_id = $row['country_id'];

        $fetch_state = "SELECT state_id, state_name FROM em_states WHERE country_id='$country_id'";
        $fetch_state_execute = mysqli_query($conn, $fetch_state);

        if (!$fetch_state_execute) {
            error500("Database query failed");
        }

        $value = mysqli_fetch_all($fetch_state_execute, MYSQLI_ASSOC);

        $data = [
            "status" => true,
            "message" => "States fetched Successfully",
            "data" => $value
        ];
        header("HTTP/1.0 200 OK");
        echo json_encode($data);
    } catch (Exception $ex) {
        error500($ex->getMessage());
    }
}
?>
