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
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "../../features/Slice/activeSingleSlice";

const Friend = () => {
  const [friend, setFriend] = useState([]);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);
  const dispatch = useDispatch();
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
          friendArr.push({
            ...friend.val(),
            id: friend.key,
          });
        }
      });
      setFriend(friendArr);
    });
  }, [db, user.uid]);

  // console.log(friend);

  // BlockList
  const handleBlock = (data) => {
    if (user.uid === data.senderid) {
      set(push(ref(db, "block")), {
        Block: data.recivername,
        BlockId: data.reciverid,
        BlockBy: data.sendername,
        BlockById: data.senderid,
        reciverProfile: data.reciverPicture,
        senderProfile: data.profilePicture,
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
        reciverProfile: data.profilePicture,
        senderProfile: data.reciverPicture,
      }).then(() => {
        remove(ref(db, "friends/" + data.id));
        // console.log(data.id);
      });
    }
  };

  // For Unfirend
  const handleUnfriend = (data) => {
    remove(ref(db, "friends/" + data.id));
  };

  //ActiveSingle for

  const handleActiveSingle = (item) => {
    if (item.reciverid === user.uid) {
      dispatch(
        activeChat({
          status: "single",
          id: item.senderid,
          name: item.sendername,
        })
      );

      localStorage.setItem("sigles", JSON.stringify(item));
    } else {
      dispatch(
        activeChat({
          status: "single",
          id: item.reciverid,
          name: item.recivername,
        })
      );
      localStorage.setItem("singles", JSON.stringify(item));
    }
  };

  return (
    <>
      <div className="friends">
        <div className="friend_header">
          <h4>Friends</h4>
        </div>
        {friend.map((item, i) => (
          <div
            className="friend-item-wrraper"
            key={i}
            onClick={() => handleActiveSingle(item)}
          >
            <div className="friend-images">
              {user.uid === item.reciverid ? (
                <picture>
                  <img
                    src={item.profilePicture || "./images/profile-pic.jpg"}
                    onError={(e) => {
                      e.target.src = "./images/profile-pic.jpg";
                    }}
                    alt=""
                  />
                </picture>
              ) : (
                <picture>
                  <img
                    src={item.reciverPicture || "./images/profile-pic.jpg"}
                    onError={(e) => {
                      e.target.src = "./images/profile-pic.jpg";
                    }}
                    alt=""
                  />
                </picture>
              )}
            </div>
            <div className="friend-names">
              {user.uid === item.senderid ? item.recivername : item.sendername}
            </div>
            <div className="friend-list-btn">
              <button type="button" onClick={() => handleUnfriend(item)}>
                Unfriend
              </button>
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
