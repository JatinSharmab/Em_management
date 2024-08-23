<?php
require '../../../connect.php';
include '../../../vendor/autoload.php';



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

function fetchCountries()
{
    global $conn;

    try {
        $sql = "SELECT country_name, country_id FROM em_countries";
        $res = mysqli_query($conn, $sql);
       
        if (!$res) {
            error500("Database query failed");
        }

        $row = mysqli_fetch_all($res, MYSQLI_ASSOC);

        $data = [
            "status" => true,
            "message" => "Countries Fetched Successfully",
            "data" => $row
        ];
        header("HTTP/1.0 200 OK");
        echo json_encode($data);
    } catch (Exception $ex) {
        error500($ex->getMessage());
    }
}
?>
