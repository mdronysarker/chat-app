import React, { useRef, useState } from "react";
import { IoMdImages } from "react-icons/io";
import ImageCropper from "./ImageCropper";
import "cropperjs/dist/cropper.css";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../features/Slice/LoginSlice";

const Uploadpicture = ({ setOpen }) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const chooseFile = useRef(null);

  const storage = getStorage();
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector((user) => user.login.loggedIn);
  const storageRef = ref(storage, user.uid);

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
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(LoginUser({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
          });
        });
      });
    }
  };

  // For handledargover

  const handleDargOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // For handle drop

  const handleDrop = (e) => {
    e.preventDefault();
    handleUpdateProfile(e);
  };

  return (
    <>
      <div
        className="upload_box "
        onDragOver={handleDargOver}
        onDragEnter={handleDargOver}
        onDragLeave={handleDargOver}
        onDrop={handleDrop}
      >
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
