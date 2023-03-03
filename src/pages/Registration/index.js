import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Button } from "@mui/material";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";

const Registration = () => {
  const [showPass, setShowPass] = useState("password");

  const handleShowPass = () => {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  };

  return (
    <>
      <Container fixed>
        <Grid className="box" container spacing={6}>
          <Grid item xs={6}>
            <div className="forms">
              <div className="reg-header">
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
              </div>
              <div className="input-forms">
                <form>
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#11175d",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#11175d",
                      },
                    }}
                    className="input-design"
                    label="Full Name"
                    variant="outlined"
                    type={"text"}
                  />
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#11175d",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#11175d",
                      },
                    }}
                    className="input-design"
                    label="Email"
                    variant="outlined"
                    type={"email"}
                  />
                  <div className="password">
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            borderColor: "#11175d",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#11175d",
                        },
                      }}
                      className="input-design"
                      label="Password"
                      variant="outlined"
                      type={showPass}
                    />
                    <div className="eyes" onClick={handleShowPass}>
                      {showPass === "password" ? <TbEye /> : <TbEyeOff />}
                    </div>
                  </div>

                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#11175d",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#11175d",
                      },
                    }}
                    className="input-design"
                    label="Confrim Password"
                    variant="outlined"
                    type={"password"}
                  />
                  <Button className="button" variant="contained">
                    Sign Up
                  </Button>
                </form>
                <div className="links">
                  <p>Already have an account ? Sign In</p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <h2>hlw</h2>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Registration;
