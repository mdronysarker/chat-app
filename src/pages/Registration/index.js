import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Button } from "@mui/material";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { useFormik } from "formik";
import { Signup } from "../../validation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
  const [showPass, setShowPass] = useState("password");

  const handleShowPass = () => {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  };

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const auth = getAuth();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Signup,
    onSubmit: () => {
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(() => {
          console.log("data geche");
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  });
  // console.log(formik);

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
                <form onSubmit={formik.handleSubmit}>
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
                    name="fullName"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                  />
                  {formik.errors.fullName && formik.touched.fullName ? (
                    <p className="errors">{formik.errors.fullName}</p>
                  ) : (
                    ""
                  )}
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
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="errors">{formik.errors.email}</p>
                  ) : (
                    ""
                  )}
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
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <div className="eyes" onClick={handleShowPass}>
                      {showPass === "password" ? <TbEye /> : <TbEyeOff />}
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <p className="errors">{formik.errors.password}</p>
                  ) : (
                    ""
                  )}

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
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword ? (
                    <p className="errors">{formik.errors.confirmPassword}</p>
                  ) : (
                    ""
                  )}

                  <Button type="submit" className="button" variant="contained">
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
            <div className="signup_image">
              <picture>
                <img src="./images/Sign up-rafiki.png" alt="signup-img" />
              </picture>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Registration;
