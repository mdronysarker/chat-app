import React, { useRef } from "react";
import { IoMdImages } from "react-icons/io";
import "./style.css";

const Uploadpicture = () => {
  const chooseFile = useRef(null);
  return (
    <>
      <div className="upload_box" onClick={() => chooseFile.current.click()}>
        <input type="file" hidden ref={chooseFile} />
        <div className="upload">
          <div className="upload_icon">
            <IoMdImages />
          </div>
          <p>upload photo</p>
        </div>
      </div>
    </>
  );
};

export default Uploadpicture;
