import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import "./style.css";

const Masggrp = () => {
  const [groupLists, setGroupLists] = useState([]);
  const db = getDatabase();

  // Show all grp
  useEffect(() => {
    const starCountRef = ref(db, "group");
    onValue(starCountRef, (snapshot) => {
      const allGrps = [];
      snapshot.forEach((item) => {
        allGrps.push({ ...item.val(), id: item.key });
      });
      setGroupLists(allGrps);
    });
  }, [db]);

  // console.log(groupLists);

  return (
    <>
      <div className="masggrp">
        <div className="masggrp_header">
          <h4>All Groups</h4>
        </div>
        {groupLists.map((item, i) => (
          <div className="masggrp-item-wrraper" key={i}>
            <div className="masggrp-images"></div>
            <div className="masggrp-names">
              <h4>{item.groupName}</h4>
              <span>{item.groupTag}</span>
            </div>
            <button type="button">Message</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Masggrp;
