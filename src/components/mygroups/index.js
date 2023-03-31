import React from "react";
import "./style.css";
import Rootcomponent from "../rootcomponent/Rootcomponent";
import { Mygroupsdata } from "./data";

const Mygroups = () => {
  return (
    <>
      <div className="mygroups">
        <div className="mygroups_header">
          <h4>My Group</h4>
        </div>
        {Mygroupsdata.map((item, i) => (
          <Rootcomponent key={i} images={item.image} name={item.name} />
        ))}
      </div>
    </>
  );
};

export default Mygroups;
