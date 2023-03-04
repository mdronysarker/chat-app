import React, { useState } from "react";
import Container from "@mui/material/Container";
import DotLoader from "react-spinners/DotLoader";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Button } from "@mui/material";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { useFormik } from "formik";
import { Signup } from "../../validation";
import { ToastContainer, toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [showPass, setShowPass] = useState("password");
  const [loading, setLoading] = useState(false);

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
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Signup,
    onSubmit: () => {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(() => {
          sendEmailVerification(auth.currentUser);
          toast.success("Registration done, Please cheek your email", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
          formik.resetForm();
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 1600);
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
        <ToastContainer />
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

                  {loading ? (
                    <Button
                      type="submit"
                      className="button"
                      variant="contained"
                    >
                      <DotLoader size={"30px"} />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="button"
                      variant="contained"
                    >
                      Sign Up
                    </Button>
                  )}
                </form>
                <div className="links">
                  <p>
                    Already have an account ? <Link to="/login">Sign In</Link>
                  </p>
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
