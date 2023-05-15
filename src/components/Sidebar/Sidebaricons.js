import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const Sidebaricons = () => {
  return (
    <>
      <div className="icons">
        <NavLink className="sidebar_icon" to={"/"}>
          <AiOutlineHome />
        </NavLink>
        <NavLink className="sidebar_icon" to={"/message"}>
          <FaComment />
        </NavLink>
        <NavLink className="sidebar_icon" to={"/notification"}>
          <IoMdNotificationsOutline />
        </NavLink>
        <NavLink className="sidebar_icon" to={"/text"}>
          <AiOutlineSetting />
        </NavLink>
      </div>
    </>
  );
};

export default Sidebaricons;
