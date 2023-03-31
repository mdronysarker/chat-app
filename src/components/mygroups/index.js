import React from "react";
import "./style.css";
import Rootcomponent from "../rootcomponent/Rootcomponent";

const Mygroups = () => {
  return (
    <>
      <div className="mygroups">
        <div className="mygroups_header">
          <h4>My Group</h4>
        </div>
        <Rootcomponent />
      </div>
    </>
  );
};

export default Mygroups;
