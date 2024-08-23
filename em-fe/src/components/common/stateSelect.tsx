import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface State {
  state_id: number;
  state_name: string;
}

interface StateSelectProps {
  country: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  error?: string;
}

const StateSelect: React.FC<StateSelectProps> = ({
  country,
  value,
  onChange,
  register,
  error,
}) => {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    if (country) {
      fetch("http://localhost/em_management/api/v1/state/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_country: country }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setStates(data.data);
          } else {
            console.error("Failed to fetch states:", data.message);
          }
        })
        .catch((error) => console.error("Error fetching states:", error));
    } else {
      setStates([]);
    }
    // setCities([]);
  }, [country]);

  return (
    <Box>
      <TextField
        label="State"
        select
        placeholder="Enter State"
        value={value}
        {...register("state", { required: "State is required" })}
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
        {states.map((state) => (
          <MenuItem key={state.state_id} value={state.state_name}>
            {state.state_name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default StateSelect;
