import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalImage from "react-modal-image";
import "./style.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { GrGallery } from "react-icons/gr";
import { FaRegSave } from "react-icons/fa";
import { AiOutlinePrinter } from "react-icons/ai";
import { HiOutlineCamera } from "react-icons/hi";
import { FaTelegram } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";

const actions = [
  { icon: <GrGallery />, name: "Gallery" },
  { icon: <FaRegSave />, name: "Save" },
  { icon: <AiOutlinePrinter />, name: "Print" },
  { icon: <HiOutlineCamera />, name: "Camera" },
];

const Chatting = () => {
  const [showCamera, setShowCamera] = useState(false);
  const chooseFile = useRef();

  const activeChatname = useSelector((active) => active.active.active);

  const showMorefundamantal = (name) => {
    if (name === "Camera") {
      setShowCamera(true);
    } else if (name === "Gallery") {
      chooseFile.current.click();
      // console.log("gallery");
    }
  };

  // for cmera
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  return (
    <>
      <div className="chatting-box">
        <div className="active_user_status">
          <div className="user_image">
            <div className="image"></div>
            <div className="info">
              <h4>{activeChatname.name ? activeChatname.name : ""}</h4>
              <span>Online</span>
            </div>
          </div>
          <div className="info_bar">
            <BsThreeDotsVertical />
          </div>
        </div>
        {showCamera && (
          <div className="open-camera">
            <RxCross2 onClick={() => setShowCamera(false)} />
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
            />
          </div>
        )}
        <div className="message">
          {/* Left message start */}
          <div className="left_masg">
            <div className="left_text">
              <p>Hello, Bro How are You?</p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* left masg end */}
          {/* Right masg start */}
          <div className="right_masg">
            <div className="right_text">
              <p>I'm Fine . Thank You</p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          <div className="right_masg">
            <div className="right_text">
              <p>
                Hey What's Your work progress. Please give me the final update.
                I want to show the work
              </p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* Right masg end */}
          {/* Left message start */}
          <div className="left_masg">
            <div className="left_image">
              <ModalImage
                small={"./images/demo.jpg"}
                large={"./images/demo.jpg"}
              />
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* left masg end */}
          {/* right message start */}
          <div className="right_masg">
            <div className="right_image">
              <ModalImage
                small={"./images/demo.jpg"}
                medium={"./images/demo.jpg"}
              />
            </div>
            <span>Today, 3:01pm</span>
          </div>
          {/* left masg end */}
          {/* right message start */}
          <div className="right_masg">
            <audio controls></audio>
            <span>Today, 3:01pm</span>
          </div>
          {/* right masg end */}
          {/* left message start */}
          <div className="left_masg">
            <audio controls></audio>
            <span>Today, 3:01pm</span>
          </div>
          {/* left masg end */}
          {/* left message start */}
          <div className="left_masg">
            <video controls></video>
            <span>Today, 3:01pm</span>
          </div>
          {/* left masg end */}
        </div>
        <div className="message-inputs">
          <div className="text-inputs">
            <input type="text" />
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 23, right: 195 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  onClick={() => showMorefundamantal(action.name)}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </div>
          <input hidden type="file" ref={chooseFile} />
          <button className="telegram" type="submit">
            <FaTelegram />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatting;
