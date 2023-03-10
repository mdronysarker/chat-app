import React from "react";
import Sidebaricons from "./Sidebaricons";
import { BiLogOut } from "react-icons/bi";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../features/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const users = useSelector((user) => user.login.loggedIn);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(LoginUser(null));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <div>
            <div className="profile-pic">
              <picture>
                <img src="./images/profile-pic.jpg" alt="" />
              </picture>
            </div>
            <div className="user_name">
              <h4>{users.displayName}</h4>
            </div>
          </div>

          <div className="other_pages">
            <Sidebaricons />
          </div>
          <div className="logout" onClick={handleLogout}>
            <BiLogOut />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
