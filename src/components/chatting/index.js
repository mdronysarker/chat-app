import React, { useEffect, useRef, useState } from "react";
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
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";

const actions = [
  { icon: <GrGallery />, name: "Gallery" },
  { icon: <FaRegSave />, name: "Save" },
  { icon: <AiOutlinePrinter />, name: "Print" },
  { icon: <HiOutlineCamera />, name: "Camera" },
];

const Chatting = () => {
  const [showCamera, setShowCamera] = useState(false);
  const chooseFile = useRef();
  const [sendMasg, setSendMasg] = useState("");
  const [singleMasgList, setSingleMasgList] = useState([]);
  const [captureImage, setCaptureImage] = useState("");

  const db = getDatabase();
  const storage = getStorage();

  const activeChatname = useSelector((active) => active.active.active);
  const user = useSelector((users) => users.login.loggedIn);

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
    setCaptureImage(dataUri);
    const storageRef = sref(
      storage,
      `captureSendImage/ ${user.displayName} = ${user.uid}/ ${uuidv4()}`
    );
    uploadString(storageRef, dataUri, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singlemasg")), {
          whosendId: user.uid,
          whosendName: user.displayName,
          whorecevieId: activeChatname.id,
          whorecevieName: activeChatname.name,
          img: dataUri,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          setShowCamera(false);
        });
      });
    });
  }

  // console.log(captureImage, "ronby");

  // For message send
  const handleSubmit = () => {
    if (activeChatname?.status === "single") {
      set(push(ref(db, "singlemasg")), {
        whosendId: user.uid,
        whosendName: user.displayName,
        whorecevieId: activeChatname.id,
        whorecevieName: activeChatname.name,
        masg: sendMasg,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    } else {
      console.log("nai");
    }
  };

  // Read single message

  useEffect(() => {
    const starCountRef = ref(db, "singlemasg");
    onValue(starCountRef, (snapshot) => {
      const singlechat = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendId === user.uid &&
            item.val().whorecevieId === activeChatname.id) ||
          (item.val().whorecevieId === user.uid &&
            item.val().whosendId === activeChatname.id)
        ) {
          singlechat.push(item.val());
        }
      });
      setSingleMasgList(singlechat);
    });
  }, [db, user.uid, activeChatname.id]);

  // console.log(singleMasgList);

  // // send image in chat box
  // const handleUploadImage = (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = sref(storage, file.name);

  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       console.log(error.code);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         // Update your state or perform additional actions with the downloadURL
  //       });
  //     }
  //   );
  // };

  return (
    <>
      <div className="chatting-box">
        <div className="active_user_status">
          <div className="user_image">
            <div className="image"></div>
            <div className="info">
              <h4>{activeChatname?.name}</h4>
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
          {activeChatname.status === "single"
            ? singleMasgList.map((item, i) =>
                item.whosendId === user.uid ? (
                  item.masg ? (
                    <>
                      <div className="right_masg">
                        <div className="right_text">
                          <p>{item.masg}</p>
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="right_masg">
                      <div className="right_image">
                        <ModalImage small={item.img} medium={item.img} />
                      </div>
                      <span>Today, 3:01pm</span>
                    </div>
                  )
                ) : item.masg ? (
                  <>
                    <div className="left_masg">
                      <div className="left_text">
                        <p>{item.masg}</p>
                      </div>
                      <span>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="left_masg">
                    <div className="left_image">
                      <ModalImage small={item.img} medium={item.img} />
                    </div>
                    <span>Today, 3:01pm</span>
                  </div>
                )
              )
            : "grp masr"}
        </div>
        <div className="message-inputs">
          <div className="text-inputs">
            <input type="text" onChange={(e) => setSendMasg(e.target.value)} />
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
          <input
            hidden
            type="file"
            ref={chooseFile}
            // onClick={handleUploadImage}
          />
          <button className="telegram" type="submit" onClick={handleSubmit}>
            <FaTelegram />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatting;
