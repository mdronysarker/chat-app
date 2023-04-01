import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import "./style.css";
import { useSelector } from "react-redux";

const Userlists = () => {
  const [usersList, setUsersList] = useState([]);
  const [friendreq, setFriendreq] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const userArr = [];
      snapshot.forEach((userlist) => {
        if (user.uid !== userlist.key) {
          userArr.push({ ...userlist.val(), id: userlist.key });
        }
      });
      setUsersList(userArr);
    });
  }, []);

  // Sent Request
  const handleSentRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
      senderid: user.uid,
      recivername: item.username,
      reciverid: item.id,
    });
  };

  // Show friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        reqarr.push(item.val().reciverid + item.val().senderid);
      });
      setFriendreq(reqarr);
    });
  }, []);

  return (
    <>
      <div className="userlists">
        <div className="userlists_header">
          <h4>User List</h4>
        </div>
        {usersList.map((item, i) => (
          <div key={i} className="userlists-wrraper">
            <div className="userlists-images"></div>
            <div className="userlists-names">
              <h5>{item.username}</h5>
            </div>
            <div className="userlists-btn">
              {friendreq.includes(item.id + user.uid) ||
              friendreq.includes(user.uid + item.id) ? (
                <button type="button" disabled>
                  Cancel Requset
                </button>
              ) : (
                <button type="button" onClick={() => handleSentRequest(item)}>
                  Sent Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Userlists;
