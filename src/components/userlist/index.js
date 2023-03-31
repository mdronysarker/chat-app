import React from "react";
import "./style.css";
import Rootcomponent from "../rootcomponent/Rootcomponent";
import { Usersdata } from "./data";

const Userlists = () => {
  return (
    <>
      <div className="userlists">
        <div className="userlists_header">
          <h4>User List</h4>
        </div>
        {Usersdata.map((item, i) => (
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

export default Userlists;
