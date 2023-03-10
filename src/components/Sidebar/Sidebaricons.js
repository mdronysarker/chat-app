import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";

const Sidebaricons = () => {
  return (
    <>
      <div className="icons">
        <div className="sidebar_icon">
          <AiOutlineHome />
        </div>
        <div className="sidebar_icon">
          <FaComment />
        </div>
        <div className="sidebar_icon">
          <IoMdNotificationsOutline />
        </div>
        <div className="sidebar_icon">
          <AiOutlineSetting />
        </div>
      </div>
    </>
  );
};

export default Sidebaricons;
