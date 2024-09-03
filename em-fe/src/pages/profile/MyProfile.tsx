import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState, useEffect, ReactElement, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "axiosConfig";

import { rootPaths, pagesRoutes } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import MyButton from "components/common/button";
import { useUser } from "components/context/context";
import useAxios from "axiosConfig";

const UserProfile = (): ReactElement => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const axiosInstance = useAxios();
  const { username } = useUser();

  useEffect(() => {
    getUserProfileData();
  }, []);

  const ToMyProjects = () => {
    navigate("/projects");
  };

  const getUserProfileData = async () => {
    try {
      const response = await axiosInstance.get("/myprofile/");
      const result = await response.data;
      console.log(result.user);

      if (response.status === 200) {
        setUserData(result?.user);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error: any) {
      console.error("Error fetching profile data:", error.message);
    }
  };
  const handleNavigateToUpdate = () => {
    navigate(pagesRoutes.updateProfile);
  };
  const ToChangePs = () => {
    navigate(pagesRoutes.ChangePasswords);
  };

  return (
    <div>
      {/* {username} */}
      <Box component="figure" mb={5} mx="auto" textAlign="center">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} />
        </Link>
      </Box>
      <Paper
        sx={{
          py: 6,
          px: { xs: 5, sm: 7.5 },
        }}
      >
        <Stack justifyContent="center" gap={5}>
          <Typography variant="h3" textAlign="center" color="text.secondary">
            My Profile
          </Typography>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar src="" sx={{ width: 100, height: 100 }} />
          </Box>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head">First Name:</TableCell>
                  <TableCell>{userData.firstname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Last Name:</TableCell>
                  <TableCell>{userData.lastname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Email:</TableCell>
                  <TableCell>{userData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Mobile:</TableCell>
                  <TableCell>{userData.mobile}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Gender:</TableCell>
                  <TableCell>{userData.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">City:</TableCell>
                  <TableCell>{userData.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">State:</TableCell>
                  <TableCell>{userData.state}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head">Country:</TableCell>
                  <TableCell>{userData.country}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            justifyContent={"space-between"}
            marginLeft={100}
            display={"flex"}
            marginRight={100}
          >
            {/* <Button
              type="submit"
              sx={{
                mx: "auto",
                fontWeight: "fontWeightRegular",                                                                               
              }}
              onClick={handleNavigateToUpdate}
            >
              Edit
            </Button> */}
            <Box
              sx={{
                mx: "auto",
                fontWeight: "fontWeightRegular",
              }}
            >
              <MyButton
                type="submit"
                text="Edit"
                onClick={handleNavigateToUpdate}
              />
            </Box>
            <Box
              sx={{
                mx: "auto",
                marginX: "120px",
                fontWeight: "fontWeightRegular",
              }}
            >
              <MyButton
                type="submit"
                text="Change Password"
                onClick={ToChangePs}
              />
            </Box>
            <Box>
              <MyButton
                type="submit"
                text="My Projects"
                onClick={ToMyProjects}
              />
            </Box>
            {/* <Button 
            type="submit"
            sx={{
              mx: 'auto',
              marginX:'120px',
              fontWeight: 'fontWeightRegular',
            }}
            onClick={ToChangePs}
            // >
              Change Password
            </Button> */}
          </Box>
        </Stack>
      </Paper>
    </div>
  );
};

export default UserProfile;
