import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import "./style.css";
import { useSelector } from "react-redux";

const Blockusers = () => {
  const [blockList, setBlockList] = useState([]);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);
  // console.log(user);

  // For block user
  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((block) => {
        if (block.val().BlockById === user.uid) {
          // blockArr.push({ ...block.val(), id: block.key });
          blockArr.push({
            id: block.key,
            block: block.val().Block,
            blockid: block.val().BlockId,
            reciverProfile: block.val().reciverProfile,
            // senderProfile: block.val().senderProfile,
          });
        } else {
          blockArr.push({
            id: block.key,
            blockby: block.val().BlockBy,
            blockid: block.val().BlockById,
            // reciverProfile: block.val().reciverProfile,
            senderProfile: block.val().senderProfile,
          });
        }
      });
      setBlockList(blockArr);
    });
  }, [db, user.uid]);

  const handleUnBlock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockid,
      reciverid: user.uid,
      recivername: user.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };

  return (
    <>
      <div className="blockusers">
        <div className="blockusers_header">
          <h4>Block</h4>
        </div>
        {blockList.map((item, i) => (
          <div className="blockusers-wrraper" key={i}>
            {console.log(item.senderPicture)}
            <div className="blockusers-images">
              <picture>
                <img
                  src={item.reciverProfile ?? item.senderProfile}
                  onError={(e) => {
                    e.target.src = "./images/profile-pic.jpg";
                  }}
                  alt=""
                />
              </picture>
            </div>
            <div className="blockusers-names">
              <h5>{item.block}</h5>
              <h5>{item.blockby}</h5>
            </div>

            {!item.blockby && (
              <div className="blockusers-btn">
                <button type="button" onClick={() => handleUnBlock(item)}>
                  Unblock
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Blockusers;
