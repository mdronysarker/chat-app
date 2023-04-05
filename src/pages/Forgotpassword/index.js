import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import "./style.css";
import { Button } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const Forget = () => {
  const auth = getAuth();

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      sendPasswordResetEmail(auth, formik.values.email)
        .then(() => {
          console.log("password reset is done");
          formik.resetForm();
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  });
  // console.log(formik);
  return (
    <>
      <div className="main_forget_wrapper">
        <div className="inner_forgot_box">
          <div className="forget-header">
            <h4>Reset your password</h4>
          </div>
          <div className="forget_pass_body">
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
                margin="normal"
                label="Email"
                variant="outlined"
                type={"text"}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div>
                <Button type="submit" variant="contained">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
