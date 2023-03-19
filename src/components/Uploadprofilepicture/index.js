import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./style.css";

const Uploadpicture = () => {
  return (
    <>
      <div className="upload_box">
        <div className="upload">
          <AiOutlineCloudUpload />
          <p>upload photo</p>
        </div>
      </div>
    </>
  );
};

export default Uploadpicture;
