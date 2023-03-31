import React from "react";
import "./style.css";

const Rootcomponent = ({ images, name }) => {
  console.log(images);
  return (
    <>
      <div className="root_wrraper">
        <div className="root-images">
          <img src={images} alt="" />
        </div>
        <div className="root-names">
          <h5>{name}</h5>
        </div>
      </div>
    </>
  );
};

export default Rootcomponent;
