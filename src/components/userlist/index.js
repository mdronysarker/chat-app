import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./style.css";

const Userlists = () => {
  const [usersList, setUsersList] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const userArr = [];
      snapshot.forEach((userlist) => {
        userArr.push(userlist.val());
      });
      setUsersList(userArr);
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
              <button type="button">Sent Request</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Userlists;
