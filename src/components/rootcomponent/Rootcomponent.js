import React from "react";
import "./style.css";

const Rootcomponent = ({ images, name, button }) => {
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
        {button && (
          <div className="root-btn">
            <button type="button">{button}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Rootcomponent;
