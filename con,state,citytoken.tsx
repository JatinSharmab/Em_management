<TextField
                label="Project Name"
                type="text"
                placeholder="Enter Project Name"
                value={userData.project_name || ''}
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

            <TextField
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
            />

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