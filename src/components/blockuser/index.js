import React from "react";
import "./style.css";
import { Blocksdata } from "./data";
import Rootcomponent from "../rootcomponent/Rootcomponent";

const Blockusers = () => {
  return (
    <>
      <div className="blockusers">
        <div className="blockusers_header">
          <h4>User List</h4>
        </div>
        {Blocksdata.map((item, i) => (
          <Rootcomponent
            key={i}
            images={item.image}
            name={item.name}
            button={item.button}
          />
        ))}
      </div>
    </>
  );
};

export default Blockusers;
