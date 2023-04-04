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

const Friendrequest = () => {
  const [friendreq, setFriendreq] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      const reqarr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverid === user.uid) {
          reqarr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendreq(reqarr);
    });
  }, [user.uid, db]);

  // Apcepted req
  const handleAccept = (data) => {
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendrequest/" + data.id));
    });
  };

  return (
    <>
      <div className="friendrequest">
        <div className="friendrequest_header">
          <h4>Friend Request</h4>
        </div>
        {friendreq.map((item, i) => (
          <div key={i} className="friendrequest-item-wrraper">
            <div className="friendrequest-images"></div>
            <div className="friendrequest-names">
              <h5>{item.sendername}</h5>
            </div>
            <div className="friendrequest-list-btn">
              <button type="button" onClick={() => handleAccept(item)}>
                Accept
              </button>
              <button type="button">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friendrequest;
