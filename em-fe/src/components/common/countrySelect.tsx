import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface Country {
  country_id: number;
  country_name: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  register,
  error,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("http://localhost/em_management/api/v1/country/")
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setCountries(data.data);
        } else {
          console.error("Failed to fetch countries:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <Box>
      <TextField
        label="Country"
        select
        value={value}
        {...register("country", { required: "Country is required" })}
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
      >
        {countries.map((country) => (
          <MenuItem key={country.country_id} value={country.country_name}>
            {country.country_name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CountrySelect;
