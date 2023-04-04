import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./style.css";
import { useSelector } from "react-redux";

const Blockusers = () => {
  const [blockList, setBlockList] = useState([]);

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedIn);

  // For block user
  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((block) => {
        if (block.val().BlockById === user.uid) {
          blockArr.push({ ...block.val(), id: block.key });
        }
      });
      setBlockList(blockArr);
    });
  }, [db, user.uid]);
  return (
    <>
      <div className="blockusers">
        <div className="blockusers_header">
          <h4>Block</h4>
        </div>
        {blockList.map((item, i) => (
          <div className="blockusers-wrraper" key={i}>
            {/* {console.log(item.block)} */}
            <div className="blockusers-images"></div>
            <div className="blockusers-names">
              <h5>{item.Block}</h5>
            </div>
            <div className="blockusers-btn">
              <button type="button">Unblock</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blockusers;
