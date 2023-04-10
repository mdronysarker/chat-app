import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Mygroups = () => {
  const [mygroup, setMygroup] = useState([]);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);

  useEffect(() => {
    const starCountRef = ref(db, "group");
    onValue(starCountRef, (snapshot) => {
      const mygroupArr = [];
      snapshot.forEach((grouplist) => {
        if (user.uid === grouplist.val().adminId) {
          mygroupArr.push({ ...grouplist.val(), id: grouplist.key });
        }
      });
      setMygroup(mygroupArr);
    });
  }, [db, user.uid]);

  return (
    <>
      <div className="mygroups">
        <div className="mygroups_header">
          <h4>My Group</h4>
        </div>
        {mygroup.map((item, i) => (
          <div className="mygroups-item-wrraper" key={i}>
            <div className="mygroups-images"></div>
            <div className="mygroups-names">
              <span>Admin {item.adminName}</span>
              <h4>{item.groupName}</h4>
              <span>{item.groupTag}</span>
            </div>
            <div className="mygroups_btn">
              <button type="submit">Info</button>
              <button type="submit">Request</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Mygroups;
