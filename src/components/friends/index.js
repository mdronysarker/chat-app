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

const Friend = () => {
  const [friend, setFriend] = useState([]);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);
  // console.log(user);

  // Show friend
  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((friend) => {
        if (
          (user.uid === friend.val().senderid &&
            user.uid !== friend.val().reciverid) ||
          (user.uid === friend.val().reciverid &&
            user.uid !== friend.val().senderid)
        ) {
          friendArr.push({ ...friend.val(), id: friend.key });
        }
      });
      setFriend(friendArr);
    });
  }, [db, user.uid]);

  // BlockList
  const handleBlock = (data) => {
    if (user.uid === data.senderid) {
      set(push(ref(db, "block")), {
        Block: data.recivername,
        BlockId: data.reciverid,
        BlockBy: data.sendername,
        BlockById: data.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + data.id));
        // console.log(data.id);
      });
    } else {
      set(push(ref(db, "block")), {
        Block: data.sendername,
        BlockId: data.senderid,
        BlockBy: data.recivername,
        BlockById: data.reciverid,
      }).then(() => {
        remove(ref(db, "friends/" + data.id));
        // console.log(data.id);
      });
    }
  };

  return (
    <>
      <div className="friends">
        <div className="friend_header">
          <h4>Friends</h4>
        </div>
        {friend.map((item, i) => (
          <div className="friend-item-wrraper" key={i}>
            <div className="friend-images"></div>
            <div className="friend-names">
              {user.uid === item.senderid ? item.recivername : item.sendername}
            </div>
            <div className="friend-list-btn">
              <button type="button">Unfriend</button>
              <button type="button" onClick={() => handleBlock(item)}>
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friend;
