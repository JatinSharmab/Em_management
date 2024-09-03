import {
  Box,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPaths } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import MyButton from "components/common/button";
import DynamicSelect from "components/common/select";
import MyInput from "components/common/myInput";

const UpdateProjects = (): ReactElement => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const [success, setSuccess] = useState<boolean>(false);
  const formatDateForDisplay = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  const formatDateForBackend = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
  
  
  // console.log("this is fisrt",projectId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    getProjectData(projectId);
  }, []);

  const getProjectData = async (id: any) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        `http://localhost/em_management/api/v1/projects/update_projects/?id=${id}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUserData(result?.data);
        reset(result?.user); 
         console.log(result.data);
         

      } else {
        console.error("Failed to fetch project data");
      }
    } catch (error: any) {
      console.error("Error fetching project data:", error.message);
    }
  };

  const onSubmitProfileUpdate = async (data: any) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        `http://localhost/em_management/api/v1/projects/update/?project_id=${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      } else {
        setError("server", {
          message: "Failed to update project. Please try again.",
        });
      }
    } catch (error: any) {
      setError("server", { message: error.message });
    }
  };

  return (
    <Box
      className="main"
      sx={{
        width: "90vw",
        minHeight: "50vh",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Box component="figure" mb={5} mx="auto" textAlign="center" width="100%">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} />
        </Link>
      </Box>
      <Paper
        sx={{
          width: "100%",
          py: 6,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Stack justifyContent="center" gap={5} width="100%">
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Update Project Information
          </Typography>

          <form onSubmit={handleSubmit(onSubmitProfileUpdate)}>
            
            <TextField
              label="Project Name"
              type="text"
              placeholder="Enter Project Name"
              value={userData.project_name || ""}
              {...register("project_name", {
                required: "Project Name is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_name: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_name}
              helperText={
                errors.project_name ? String(errors.project_name.message) : ""
              }
            />
            <TextField
              label="Technology"
              type="text"
              placeholder="Enter Technology"
              value={userData.project_technology}
              {...register("project_technology", {
                required: "Technology is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_technology: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_technology}
              helperText={
                errors.project_technology
                  ? String(errors.project_technology.message)
                  : ""
              }
            />

            <TextField
              label="Status"
              type="text"
              placeholder="Enter Status"
              value={userData.project_status}
              {...register("project_status", {
                required: "Status is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_status: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_status}
              helperText={
                errors.project_status
                  ? String(errors.project_status.message)
                  : ""
              }
            />

            <TextField
              label="Project Lead"
              type="text"
              placeholder="Enter Project Lead"
              value={userData.project_lead}
              {...register("project_lead", {
                required: "Project Lead is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_lead: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_lead}
              helperText={
                errors.project_lead ? String(errors.project_lead.message) : ""
              }
            />

            <TextField
              label="Project Manager"
              type="text"
              placeholder="Enter Project Manager"
              value={userData.project_manager}
              {...register("project_manager", {
                required: "Project Manager is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_manager: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_manager}
              helperText={
                errors.project_manager
                  ? String(errors.project_manager.message)
                  : ""
              }
            />

            <TextField
              label="Project Client"
              type="text"
              placeholder="Enter Project Client"
              value={userData.project_client}
              {...register("project_client", {
                required: "Project Client is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_client: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_client}
              helperText={
                errors.project_client
                  ? String(errors.project_client.message)
                  : ""
              }
            />
            <MyInput
              label="Project Start Date"
              placeholder="Enter Project Start Date"
              type="Date"
              name="project_start_date"
              value={userData.project_start_date}
              register={register}
              
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                minWidth: "100%",
                marginBottom: "7px",
              }}
              onChange={(e) =>
                setUserData({ ...userData, project_start_date: e.target.value })
              }
              
            />
            <Typography color="error" variant="body2">
              {errors.project_start_date ? String(errors.project_start_date.message) : ""}
            </Typography>
            <JSON.stringify>{userData.project_start_date}</JSON.stringify>

            <MyInput
              label="Project Deadline Date"
              placeholder="Enter Project Deadline Date"
              type="date"
              name="project_deadline_date"
              value={userData.project_deadline_date}
              register={register}
              
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                minWidth: "100%",
                marginBottom: "7px",
              }}
              onChange={(e) =>
                setUserData({ ...userData, project_deadline_date: e.target.value })
              }
            />
            <Typography color="error" variant="body2">
              {errors.project_deadline_date ? String(errors.project_deadline_date.message) : ""}
            </Typography>
             <DynamicSelect
              selectFields={[
                {
                  label: "Management Tool",
                  name: "project_management_tool",
                  placeholder: "Enter Gender",
                  value: userData.project_management_tool || " ",
                  options: [
                    { value: "Zira", label: "Zira" },
                    { value: "Trello", label: "Trello" },
                  ],
                  register: register("project_management_tool", {
                    required: "Project Management Tool is required",
                  }),
                  error: errors.project_management_tool ? String(errors.project_management_tool.message) : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({ ...userData, project_management_tool: event.target.value });
                  },
                },
              ]}
            />
            {/* <TextField
              label="Management Tool"
              type="text"
              placeholder="Enter Management Tool"
              value={userData.project_management_tool}
              {...register("project_management_tool", {
                required: "Management Tool is required",
              })}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  project_management_tool: e.target.value,
                })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_management_tool}
              helperText={
                errors.project_management_tool
                  ? String(errors.project_management_tool.message)
                  : ""
              }
            /> */}

            <TextField
              label="Management Tool Link"
              type="text"
              placeholder="Enter Management Tool Link"
              value={userData.project_management_tool_url}
              {...register("project_management_tool_url", {
                required: "Management Tool Link is required",
              })}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  project_management_tool_url: e.target.value,
                })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_management_tool_url}
              helperText={
                errors.project_management_tool_url
                  ? String(errors.project_management_tool_url.message)
                  : ""
              }
            />
            <DynamicSelect
              selectFields={[
                {
                  label: "Repository Tool",
                  name: "project_repo_tool",  
                  placeholder: "Enter Repository Tool",
                  value: userData.project_repo_tool || " ",
                  options: [
                    { value: "Gitlab", label: "Gitlab" },
                    { value: "Github", label: "Github" },
                  ],
                  register: register("project_repo_tool", {
                    required: "Project Repository Tool is required",
                  }),
                  error: errors.project_repo_tool ? String(errors.project_repo_tool.message) : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({ ...userData, project_repo_tool: event.target.value });
                  },
                },
              ]}
            />
            <TextField
              label="Repository Tool"
              type="text"
              placeholder="Enter Repository Tool"
              value={userData.project_repo_tool}
              {...register("project_repo_tool", {
                required: "Repository Tool is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, project_repo_tool: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_repo_tool}
              helperText={
                errors.project_repo_tool
                  ? String(errors.project_repo_tool.message)
                  : ""
              }
            />

            {/* Dynamic Select for gender */}
            {/* <DynamicSelect
              selectFields={[
                {
                  label: "Gender",
                  name: "gender",
                  placeholder: "Enter Gender",
                  value: userData.gender || " ",
                  options: [
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ],
                  register: register("gender", {
                    required: "Gender is required",
                  }),
                  error: errors.gender ? String(errors.gender.message) : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({ ...userData, gender: event.target.value });
                  },
                },
              ]}
            /> */}

            <Box
              sx={{
                fontWeight: "fontWeightRegular",
                maxWidth: "300px",
                width: "100%",
                mx: "auto",
              }}
            >
              <MyButton text="Update Profile" type="submit" />
            </Box>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateProjects;
