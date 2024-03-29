import React from "react";
import { BsSearch } from "react-icons/bs";
import "./style.css";

const Searchbox = () => {
  return (
    <>
      <div className="search_wrapper">
        <div className="search_icon">
          <BsSearch />
        </div>
        <div className="search_fields">
          <input type="text" placeholder="search here" />
        </div>
      </div>
    </>
  );
};

export default Searchbox;
