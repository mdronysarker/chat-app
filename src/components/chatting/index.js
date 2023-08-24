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
import { BsEmojiSmile } from "react-icons/bs";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import { AudioRecorder } from "react-audio-voice-recorder";
import EmojiPicker from "emoji-picker-react";
import nomessage from "../../lottie/no-masg.json";
import Lottie from "lottie-react";

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
  const [sendGrpMasg, setSendGrpMasg] = useState("");
  const [singleMasgList, setSingleMasgList] = useState([]);
  const [groupMasgList, setGroupMasgList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [captureImage, setCaptureImage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [blob, setBlob] = useState("");
  const [showAudio, setShowAudio] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const scrollMasg = useRef(null);

  const db = getDatabase();
  const storage = getStorage();

  const activeChatname = useSelector((active) => active.active.active);
  // console.log(activeChatname.status, "starus");

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
          img: downloadURL,
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
      }).then(() => {
        // console.log("rony hiii");
        setSendMasg("");
      });
    } else {
      set(push(ref(db, "grpmasg")), {
        whosendId: user.uid,
        whosendName: user.displayName,
        whorecevieId: activeChatname.id,
        whorecevieName: activeChatname.name,
        adminId: activeChatname?.adminId,
        masg: sendGrpMasg,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
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
  }, [db, user.uid, activeChatname?.id]);

  // console.log(singleMasgList);

  // Read Group message

  useEffect(() => {
    const starCountRef = ref(db, "grpmasg");
    onValue(starCountRef, (snapshot) => {
      const grpchat = [];
      snapshot.forEach((item) => {
        grpchat.push(item.val());
      });
      setGroupMasgList(grpchat);
    });
  }, [db, user.uid, activeChatname?.id]);

  // send file in chat box
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const storageRef = sref(
      storage,
      `uploadSendImage/ ${user.displayName} = ${user.uid}/ ${uuidv4()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (activeChatname?.status === "single") {
            set(push(ref(db, "singlemasg")), {
              whosendId: user.uid,
              whosendName: user.displayName,
              whorecevieId: activeChatname.id,
              whorecevieName: activeChatname.name,
              img: downloadURL,
              date: `${new Date().getFullYear()} - ${
                new Date().getMonth() + 1
              } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          } else {
            set(push(ref(db, "grpmasg")), {
              whosendId: user.uid,
              whosendName: user.displayName,
              whorecevieId: activeChatname.id,
              whorecevieName: activeChatname.name,
              img: downloadURL,
              date: `${new Date().getFullYear()} - ${
                new Date().getMonth() + 1
              } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          }
        });
      }
    );
  };

  // get grp member

  useEffect(() => {
    const starCountRef = ref(db, "groupmembers");
    onValue(starCountRef, (snapshot) => {
      const userArr = [];
      snapshot.forEach((userlist) => {
        userArr.push(userlist.val().groupId + userlist.val().userId);
      });
      setMemberList(userArr);
    });
  }, [user.uid, db]);

  // console.log(memberList);

  // Message will be send with enter

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
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
        }).then(() => {
          // console.log("rony hiii");
          setSendMasg("");
        });
      } else {
        set(push(ref(db, "grpmasg")), {
          whosendId: user.uid,
          whosendName: user.displayName,
          whorecevieId: activeChatname.id,
          whorecevieName: activeChatname.name,
          masg: sendGrpMasg,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
        }).then(() => {
          // console.log("rony hiii");
          setSendGrpMasg("");
        });
      }
    }
  };

  // For audio message

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    setBlob(blob);
  };

  // Send audio message

  const handleAudioUpload = () => {
    const audioStorageRef = sref(
      storage,
      `uploadAudio/ ${user.displayName} = ${user.uid}/ ${uuidv4()}`
    );
    // 'file' comes from the Blob or File API
    uploadBytes(audioStorageRef, blob).then((snapshot) => {
      getDownloadURL(audioStorageRef).then((downloadURL) => {
        if (activeChatname?.status === "single") {
          set(push(ref(db, "singlemasg")), {
            whosendId: user.uid,
            whosendName: user.displayName,
            whorecevieId: activeChatname.id,
            whorecevieName: activeChatname.name,
            audio: downloadURL,
            date: `${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudioUrl("");
          });
        } else {
          set(push(ref(db, "grpmasg")), {
            whosendId: user.uid,
            whosendName: user.displayName,
            whorecevieId: activeChatname.id,
            whorecevieName: activeChatname.name,
            audio: downloadURL,
            date: `${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setAudioUrl("");
          });
        }
      });
    });
  };

  // For emoji

  const handleEmojiSelect = (emoji) => {
    setSendMasg(sendMasg + emoji.emoji).then(() => {
      setShowEmoji(false);
    });
    setSendGrpMasg(sendGrpMasg + emoji.emoji).then(() => {
      setShowEmoji(false);
    });
  };

  // For scroll masg

  useEffect(() => {
    scrollMasg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [singleMasgList]);

  return (
    <>
      {activeChatname?.status === "single" ||
      activeChatname?.status === "Group" ? (
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
            {activeChatname?.status === "single"
              ? singleMasgList.map((item, i) => (
                  <div ref={scrollMasg}>
                    {item.whosendId === user.uid ? (
                      item.masg ? (
                        <>
                          <div className="right_masg" key={i}>
                            <div className="right_text">
                              <p>{item.masg}</p>
                            </div>
                            <span>
                              {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                            </span>
                          </div>
                        </>
                      ) : item.img ? (
                        <div className="right_masg">
                          <div className="right_image">
                            <ModalImage small={item.img} medium={item.img} />
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : (
                        <div className="right_masg">
                          <audio controls src={item.audio}></audio>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
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
                    ) : item.img ? (
                      <div className="left_masg">
                        <div className="left_image">
                          <ModalImage small={item.img} medium={item.img} />
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : (
                      <div className="left_masg">
                        <audio controls src={item.audio}></audio>
                        <span>Today, 3:01pm</span>
                      </div>
                    )}
                  </div>
                ))
              : user.uid === activeChatname?.adminId ||
                memberList.includes(activeChatname?.id + user.uid)
              ? groupMasgList.map((item, i) => (
                  <div>
                    {item.whosendId === user.uid
                      ? item.whorecevieId === activeChatname?.id ??
                        (item.masg ? (
                          <>
                            <div className="right_masg" key={i}>
                              <div className="right_text">
                                <p>{item.masg}</p>
                              </div>
                              <span>
                                {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                              </span>
                            </div>
                          </>
                        ) : item.img ? (
                          <div className="right_masg">
                            <div className="right_image">
                              <ModalImage small={item.img} medium={item.img} />
                            </div>
                            <span>
                              {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                            </span>
                          </div>
                        ) : (
                          <div className="right_masg">
                            <audio controls src={item.audio}></audio>
                            <span>
                              {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                            </span>
                          </div>
                        ))
                      : item.whorecevieId === activeChatname?.id ?? (
                          <div className="left_masg">
                            <div className="left_text">
                              <p>{item.masg}</p>
                            </div>
                            <span>
                              {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                            </span>
                          </div>
                        )}
                  </div>
                ))
              : "nai"}
          </div>

          {activeChatname?.status === "single" ? (
            <div>
              <div className="message-inputs">
                {!showAudio && !audioUrl && (
                  <div className="text-inputs">
                    <input
                      type="text"
                      onKeyUp={handleEnterPress}
                      value={sendMasg}
                      onChange={(e) => setSendMasg(e.target.value)}
                    />

                    <div
                      className="emoji"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <BsEmojiSmile />
                    </div>
                    {showEmoji && (
                      <div className="emojipicker">
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                      </div>
                    )}
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
                )}
                <input
                  hidden
                  type="file"
                  ref={chooseFile}
                  onChange={handleUploadImage}
                />
                {!showAudio && !audioUrl && (
                  <button
                    className="telegram"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <FaTelegram />
                  </button>
                )}
              </div>

              <div onClick={() => setShowAudio(!showAudio)}>
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  downloadOnSavePress={true}
                  downloadFileExtension="mp3"
                />
              </div>
              {audioUrl && (
                <div className="audio-sound">
                  <audio controls src={audioUrl}></audio>

                  <div
                    className="voice-button"
                    variant="contained"
                    onClick={handleAudioUpload}
                  >
                    <SendIcon />
                  </div>
                  <div
                    className="voice-button"
                    variant="contained"
                    onClick={() => setAudioUrl("")}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              )}
            </div>
          ) : user.uid === activeChatname?.adminId ||
            memberList.includes(activeChatname?.id + user.uid) ? (
            <div>
              <div className="message-inputs">
                {!showAudio && !audioUrl && (
                  <div className="text-inputs">
                    <input
                      type="text"
                      onKeyUp={handleEnterPress}
                      value={sendGrpMasg}
                      onChange={(e) => setSendGrpMasg(e.target.value)}
                    />

                    <div
                      className="emoji"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <BsEmojiSmile />
                    </div>
                    {showEmoji && (
                      <div className="emojipicker">
                        <EmojiPicker onEmojiClick={handleEmojiSelect} />
                      </div>
                    )}
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
                )}
                <input
                  hidden
                  type="file"
                  ref={chooseFile}
                  onChange={handleUploadImage}
                />
                {!showAudio && !audioUrl && (
                  <button
                    className="telegram"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <FaTelegram />
                  </button>
                )}
              </div>

              <div onClick={() => setShowAudio(!showAudio)}>
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  downloadOnSavePress={true}
                  downloadFileExtension="mp3"
                />
              </div>
              {audioUrl && (
                <div className="audio-sound">
                  <audio controls src={audioUrl}></audio>

                  <div
                    className="voice-button"
                    variant="contained"
                    onClick={handleAudioUpload}
                  >
                    <SendIcon />
                  </div>
                  <div
                    className="voice-button"
                    variant="contained"
                    onClick={() => setAudioUrl("")}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Lottie animationData={nomessage} loop={true} />
      )}
    </>
  );
};

export default Chatting;
