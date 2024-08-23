import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface City {
  city_id: number;
  city_name: string;
}

interface CitySelectProps {
  state: string;
  country: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  error?: string;
}

const CitySelect: React.FC<CitySelectProps> = ({
  state,
  country,
  value,
  onChange,
  register,
  error,
}) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    // Reset cities if country changes
    if (!country) {
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      fetch("http://localhost/em_management/api/v1/city/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_state: state }),
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
  }, [state]);

  return (
    <Box>
      <TextField
        label="City"
        select
        placeholder="Enter City"
        value={value}
        {...register("city", { required: "City is required" })}
        onChange={onChange}
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
        error={!!error}
        helperText={error || ""}
        disabled={!state}  // Disable if no state is selected
      >
        {cities.map((city) => (
          <MenuItem key={city.city_id} value={city.city_name}>
            {city.city_name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CitySelect;
