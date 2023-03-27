import React, { useRef, useState } from "react";
import { IoMdImages } from "react-icons/io";
import ImageCropper from "./ImageCropper";
import "cropperjs/dist/cropper.css";
import "./style.css";

const Uploadpicture = ({ setOpen }) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const chooseFile = useRef(null);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <>
      <div className="upload_box ">
        <input
          type="file"
          hidden
          ref={chooseFile}
          onChange={handleUpdateProfile}
        />
        <div className="upload" onClick={() => chooseFile.current.click()}>
          <div className="upload_icon">
            <IoMdImages />
          </div>
          <p>Upload photo</p>
        </div>
        {image && (
          <ImageCropper
            image={image}
            setCropper={setCropper}
            setImage={setImage}
            cropData={cropData}
            getCropData={getCropData}
          />
        )}
      </div>
    </>
  );
};

export default Uploadpicture;
