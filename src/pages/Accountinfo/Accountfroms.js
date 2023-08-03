import { Button, TextField } from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../features/Slice/LoginSlice";

const Accountfroms = () => {
  const users = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const auth = getAuth();

  const dispatch = useDispatch();

  const initialValues = {
    name: users.displayName,
    email: users.email,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      handleUpdateProfile();
    },
  });

  const handleUpdateProfile = async () => {
    await updateProfile(auth.currentUser, {
      displayName: formik.values.name,
    }).then(async () => {
      const userInfo = {
        displayName: auth.currentUser.displayName,
      };
      await update(ref(db, "users/" + users.uid), {
        username: userInfo.displayName,
      });

      dispatch(LoginUser({ ...users, displayName: formik.values.name }));
      localStorage.setItem(
        "users",
        JSON.stringify({
          ...users,
          displayName: formik.values.name,
        })
      );
    });
  };

  return (
    <>
      <div>
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
            name="name"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.name}
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
            name="email"
            disabled
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <Button variant="contained" fullWidth type="submit">
            Update Account
          </Button>
        </form>
      </div>
    </>
  );
};

export default Accountfroms;
