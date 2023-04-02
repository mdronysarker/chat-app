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

const Userlists = () => {
  const [usersList, setUsersList] = useState([]);
  const [friendreq, setFriendreq] = useState([]);
  const [friendreqs, setFriendreqs] = useState([]);
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
  }, [user.uid, db]);

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
  }, [db]);

  // cancel
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        reqarr.push({ ...item.val(), id: item.key });
      });

      setFriendreqs(reqarr);
    });
  }, [db]);

  console.log(friendreqs);

  // Cancel req
  const handleCancel = (id) => {
    remove(ref(db, "friendrequest/" + id));
    console.log(id);
  };
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
            <div className="userlists-btn" key={i}>
              {friendreq.includes(item.id + user.uid) ||
              friendreq.includes(user.uid + item.id) ? (
                <button
                  type="button"
                  onClick={() =>
                    handleCancel(
                      friendreqs.find(
                        (req) =>
                          req.reciverid === item.id && req.senderid === user.uid
                      ).id
                    )
                  }
                >
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
