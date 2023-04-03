import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./style.css";

const Friend = () => {
  const [friend, setFriend] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((friend) => {
        friendArr.push({ ...friend.val(), id: friend.key });
      });
      setFriend(friendArr);
    });
  }, [db]);

  console.log(friend);

  return (
    <>
      <div className="friends">
        <div className="friend_header">
          <h4>Friends</h4>
        </div>
        {friend.map((item, i) => (
          <div className="friend-item-wrraper" key={i}>
            <div className="friend-images"></div>
            <div className="friend-names">{item.sendername}</div>
            <div className="friend-list-btn">
              <button type="button">Unfriend</button>
              <button type="button">Block</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friend;
