import React from "react";
import axios from "axios";

interface SoftDeleteButtonProps {
  projectId: string;
  fun: any;
}

const DeleteButton: React.FC<SoftDeleteButtonProps> = ({ projectId, fun }) => {
  const handleSoftDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        const response = await axios.post(
          "http://localhost/em_management/api/v1/projects/delete_projects/",
          {
            project_id: projectId,
          }
        );

        if (response.status === 200) {
          alert("Project soft deleted successfully");
        //   <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        //   <Alert severity="success" sx={{ width: "100%" }}>
        //     Item deleted successfully!
        //   </Alert>
        // </Snackbar>

          fun(projectId);
        } 
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("An error occurred while deleting the project");
      }
    }
  };

  return (
    <button
      style={{ padding: 6, margin: 5, background: "#73CABE", color: "black" }}
      onClick={handleSoftDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
