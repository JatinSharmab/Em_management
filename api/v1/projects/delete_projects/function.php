<?php
require '../../../../connect.php';
require "/var/www/html/em_management/vendor/autoload.php";

// Function to send a 422 Unprocessable Entity error response
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

// Function to perform a soft delete of a project
function softDeleteProject($inputData)
{
    global $conn;

    // Check if input data is set and is an array
    if (!isset($inputData) || !is_array($inputData)) {
        error422('Input data is not set or is not an array.');
        return;
    }

    // Check if 'project_id' is present in the input data
    if (!isset($inputData['project_id'])) {
        error422('Project ID is missing.');
        return;
    }

    // Sanitize and prepare the project_id
    $project_id = mysqli_real_escape_string($conn, $inputData['project_id']);
    $deletedAt = time(); // Using current Unix timestamp

    try {
        // Prepare SQL query
        $sql = "UPDATE em_projects SET project_deleted_at = '$deletedAt' WHERE project_id = '$project_id'";

        // Execute SQL query
        if (mysqli_query($conn, $sql)) {
            $data = [
                'status' => 200,
                'message' => 'Project deleted successfully',
            ];
            header("HTTP/1.0 200 OK");
            echo json_encode($data);
        } else {
            error422('Project deletion failed: ' . mysqli_error($conn));
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
