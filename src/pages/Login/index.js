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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Signin } from "../../validation";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../features/Slice/LoginSlice";

const Login = () => {
  const [showPass, setShowPass] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleShowPass = () => {
    showPass === "password" ? setShowPass("text") : setShowPass("password");
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const auth = getAuth();
  const navigate = useNavigate();
  const googleprovider = new GoogleAuthProvider();
  const fbprovider = new FacebookAuthProvider();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Signin,
    onSubmit: () => {
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          // console.log(user);
          if (user.emailVerified) {
            dispatch(LoginUser(user));
            localStorage.setItem("users", JSON.stringify(user));
            formik.resetForm();
            setLoading(false);
            setTimeout(() => {
              navigate("/");
            }, 1600);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found"))
            toast.success("Invalid Email", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            });

          if (error.code.includes("auth/wrong-password"))
            toast.success("Password Incorrect", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            });

          setLoading(false);
        });
    },
  });

  const handelGoogleauth = () => {
    signInWithPopup(auth, googleprovider)
      .then(({ user }) => {
        dispatch(LoginUser(user));
        localStorage.setItem("users", JSON.stringify(user));
        setTimeout(() => {
          navigate("/");
        }, 1600);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const handleFacebookauth = () => {
    signInWithPopup(auth, fbprovider)
      .then(({ user }) => {
        dispatch(LoginUser(user));
        localStorage.setItem("users", JSON.stringify(user));
        setTimeout(() => {
          navigate("/");
        }, 1600);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className="box" container spacing={6}>
          <Grid item xs={6}>
            <div className="signup_image">
              <picture>
                <img src="./images/login.png" alt="signin-img" />
              </picture>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="froms">
              <div className="login-header">
                <div className="avatar">
                  <picture>
                    <img src="./images/avatar.png" alt="" />
                  </picture>
                </div>
                <h2>Login to your account!</h2>
              </div>
              <div className="flex">
                <div className="authentication" onClick={handelGoogleauth}>
                  <div className="auth_pic">
                    <picture>
                      <img src="./images/google.png" alt="" />
                    </picture>
                  </div>
                  <div className="auth_text">
                    <p>Login with Google</p>
                  </div>
                </div>
                <div className="authentication_fb" onClick={handleFacebookauth}>
                  <div className="fb_pic">
                    <picture>
                      <img src="./images/facebook.png" alt="" />
                    </picture>
                  </div>
                  <div className="fb_text">
                    <p>Login with Facebook</p>
                  </div>
                </div>
              </div>
              <div className="inputs-from">
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
                    label="Email"
                    variant="outlined"
                    type={"text"}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
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
                      label="password"
                      variant="outlined"
                      type={showPass}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <p className="errors">{formik.errors.password}</p>
                    ) : (
                      ""
                    )}
                    <div className="eyes" onClick={handleShowPass}>
                      {showPass === "password" ? (
                        <TbEye></TbEye>
                      ) : (
                        <TbEyeOff></TbEyeOff>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <Button
                      type="submit"
                      className="button"
                      variant="contained"
                    >
                      <DotLoader size={"30px"}></DotLoader>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="button"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  )}
                </form>
                <div className="links">
                  <div className="forgot">
                    <Link to={"/forgot"}>Forgot Password</Link>
                  </div>
                  <p>
                    Don't have an account ?
                    <Link to="/registration">sign up</Link>
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
