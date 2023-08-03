import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import Accountfroms from "./Accountfroms";

const Accountinfo = () => {
  const users = useSelector((user) => user.login.loggedIn);

  return (
    <>
      <div className="account_info">
        <div className="account_info_box">
          <div className="profile_pic">
            <img
              src={users.photoURL || "./images/profile-pic.jpg"}
              onError={(e) => {
                e.target.src = "./images/profile-pic.jpg";
              }}
              alt=""
            />
          </div>
          <div className="account-from-box">
            <Accountfroms />
          </div>
        </div>
      </div>
    </>
  );
};

export default Accountinfo;
