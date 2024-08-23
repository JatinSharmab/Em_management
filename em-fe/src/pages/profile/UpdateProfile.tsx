import {
  Box,
  Link,
  Paper,
  Stack,
  Button,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  MenuItem,
} from "@mui/material";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPaths } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import MyButton from "components/common/button";
import MyInput from "components/common/myInput";
import DynamicSelect from "components/common/select";
import CountrySelect from "components/common/countrySelect";
import StateSelect from "components/common/stateSelect";
import CitySelect from "components/common/citySelect";
interface Country {
  country_id: number;
  country_name: string;
}

interface State {
  state_id: number;
  state_name: string;
}

interface City {
  city_id: number;
  city_name: string;
}

const UpdateProfile = (): ReactElement => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [userData, setUserData] = useState<any>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] =
    useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    getUserProfileData();
  }, []);

  useEffect(() => {
    if (userData.state) {
      fetch("http://localhost/em_management/api/v1/city/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_state: userData.state }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setCities(data.data);
          } else {
            console.error("Failed to fetch cities:", data.message);
          }
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [userData.state]);

  const getUserProfileData = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        "http://localhost/em_management/api/v1/myprofile/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );

      const result = await response.json();
      console.log(result.user);

      if (response.ok) {
        setUserData(result?.user);
        console.log(result.user, "userdataaaaaa");
        reset(result?.user); // Reset form values with fetched data
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error: any) {
      console.error("Error fetching profile data:", error.message);
    }
  };
  // const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (e.target) setProfilePicture(e.target.result as string);
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };

  const onSubmitProfileUpdate = async (data: any) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        "http://localhost/em_management/api/v1/updateprofile/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            // profilePicture: profilePicture,
            city: data.city,
            state: data.state,
            country: data.country,
            mobile: data.mobile,
            gender: data.gender,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setError("server", {
          message: "Failed to update profile. Please try again.",
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
            Update Profile
          </Typography>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              src={profilePicture || userData.profilePicture}
              sx={{ width: 100, height: 100 }}
            />
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              mx: "auto",
              fontWeight: "fontWeightRegular",
              maxWidth: "300px",
              width: "100%",
            }}
          >
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              hidden
              // onChange={handleProfilePictureChange}
            />
          </Button>
          <form onSubmit={handleSubmit(onSubmitProfileUpdate)}>
            <TextField
              label="First Name"
              type="text"
              placeholder="Enter Your First Name"
              value={userData.firstname} // Use value to make it controlled
              {...register("firstname", { required: "Name is required" })}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
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
              error={!!errors.firstname}
              helperText={
                errors.firstname ? String(errors.firstname.message) : ""
              }
            />
            {/* <MyInput
              label="First Name"
              placeholder="Enter Your First Name"
              type="text"
              name="firstname"
              value={userData.firstname}
              register={register}
              onChange={(e) =>
                setUserData({ ...userData, firstname: e.target.value })
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
                  padding: "16px", // Adjust padding if needed
                },

                borderRadius: 2,
                minWidth: "100%", // Ensure the TextField is not too small
                marginBottom: "7px", // Ensure appropriate spacing between fields
              }}
            /> */}
            <TextField
              label="Last Name"
              type="text"
              placeholder="Enter Your Last Name"
              value={userData.lastname} // Use value to make it controlled
              {...register("lastname", { required: "Last name is required" })}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
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
              error={!!errors.lastname}
              helperText={
                errors.lastname ? String(errors.lastname.message) : ""
              }
            />
            {/* <MyInput
              label="Last Name"
              placeholder="Enter Your Last Name"
              type="text"
              name="lastname"
              value={userData.lastname}
              register={register}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
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
                minWidth: "100%",
                marginBottom: "7px",
              }}
            /> */}
            <TextField
              label="Email"
              type="text"
              placeholder="Enter Email"
              value={userData.email} // Use value to make it controlled
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Please enter a valid Gmail address",
                },
              })}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
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
              error={!!errors.email}
              helperText={errors.email ? String(errors.email.message) : ""}
            />
            {/* <MyInput
              label="Email"
              placeholder="Enter Your Email"
              type="text"
              name="email"
              value={userData.email}
              register={register}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
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
                  padding: "16px", // Adjust padding if needed
                },

                borderRadius: 2,
                minWidth: "100%", // Ensure the TextField is not too small
                marginBottom: "7px", // Ensure appropriate spacing between fields
              }}
            /> */}

            <TextField
              label="Mobile"
              type="text"
              placeholder="Enter Mobile"
              value={userData.mobile} // Use value to make it controlled
              {...register("mobile", { required: "Mobile number is required",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "Please enter a valid Mobile Number",
                },
               })}
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
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
              error={!!errors.mobile}
              helperText={errors.mobile ? String(errors.mobile.message) : ""}
            />
            {/* <MyInput
              label="Mobile"
              placeholder="Enter Your Mobile"
              type="string"
              name="mobile"
              value={userData.mobile}
              register={register}
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
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
                  padding: "16px", // Adjust padding if needed
                },

                borderRadius: 2,
                minWidth: "100%", // Ensure the TextField is not too small
                marginBottom: "7px", // Ensure appropriate spacing between fields
              }}
            /> */}

            {/* <TextField
              label="Gender"
              select
              placeholder="Enter Gender"
              value={userData.gender || " "} // Use value to make it controlled
              {...register("gender", { required: "Gender is required" })}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
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
              error={!!errors.gender}
              helperText={errors.gender ? String(errors.gender.message) : ""}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField> */}
            <DynamicSelect
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
            />

            {/*             
            //       label: 'Gender',
      // name: 'gender',
      // placeholder: 'Enter Gender',
      // value: userData.gender || ' ',
      // options: [
      //   { value: 'Male', label: 'Male' },
      //   { value: 'Female', label: 'Female' },
      // ],
      // register: register('gender', { required: 'Gender is required' }),
      // error: errors.gender ? String(errors.gender.message) : '',
      // onChange: handleChange, */}
            {/* <TextField
              label="Country"
              select
              // placeholder="Enter Country"
              value={userData.country || ""}
              {...register("country", { required: "Country is required" })}
              onChange={(e) =>
                setUserData({ ...userData, country: e.target.value })
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
              error={!!errors.country}
              helperText={errors.country ? String(errors.country.message) : ""}
            >
              {...countries.map((country) => (
                <MenuItem key={country.country_id} value={country.country_name}>
                  {/* {JSON.stringify(country.country_id)} */}
            {/* {country.country_name} */}
            {/* </MenuItem>
              ))}
            </TextField> */}
            

            {/* <TextField id="select" label="Age" value="20" select>
              <MenuItem value="10">Ten</MenuItem>
              <MenuItem value="20">Twenty</MenuItem>
            </TextField> */}
            {/* {JSON.stringify(userData.state)} */}
            {/* <TextField
              label="State"
              select
              placeholder="Enter State"
              value={userData.state || ""}
              {...register("state", { required: "State is required" })}
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
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
              error={!!errors.state}
              helperText={errors.state ? String(errors.state.message) : ""}
            >
              {states.map((state) => (
                <MenuItem key={state.state_id} value={state.state_name}>
                  {state.state_name}
                </MenuItem>
              ))}
            </TextField> */}
            <CountrySelect
        value={userData.country||""}
        onChange={(e) => setUserData({ ...userData, country: e.target.value, state: "", city: "" })}
        register={register}
        error={errors.country ? String(errors.country.message) : ""}
      />
      <StateSelect
        country={userData.country}
        value={userData.state||""}
        onChange={(e) => setUserData({ ...userData, state: e.target.value, city: "" })}
        register={register}
        error={errors.state ? String(errors.state.message) : ""}
      />
      <CitySelect
        state={userData.state}
        country={userData.country} // Pass country to reset cities when it changes
        value={userData.city||""}
        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
        register={register}
        error={errors.city ? String(errors.city.message) : ""}
      />
            {/* <TextField
              label="City"
              select
              placeholder="Enter City"
              value={userData.city || ""} // Use value to make it controlled
              {...register("city", { required: "City is required" })}
              onChange={(e) =>
                setUserData({ ...userData, city: e.target.value })
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
              error={!!errors.city}
              helperText={errors.city ? String(errors.city.message) : ""}
            >
              {cities.map((city) => (
                <MenuItem key={city.city_id} value={city.city_name}>
                  {city.city_name}
                </MenuItem>
              ))}
            </TextField> */}

            {/* <Divider sx={{ mt: 3, mb: 4 }} /> */}
            {/* <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: "fontWeightRegular",
                maxWidth: "300px",
                width: "100%",
                mx: "auto",
              }}
              type="submit"
            >
              Update Profile
            </Button> */}
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

export default UpdateProfile;
