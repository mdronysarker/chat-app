import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";

const Chatting = () => {
  return (
    <>
      <div className="chatting-box">
        <div className="active_user_status">
          <div className="user_image">
            <div className="image"></div>
            <div className="info">
              <h4>Rony Sarker</h4>
              <span>Online</span>
            </div>
          </div>
          <div className="info_bar">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="message">
          {/* Left message start */}
          <div className="left_masg">
            <div className="left_text">
              <p>Hello, Bro How are You?</p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* left masg end */}
          {/* Right masg start */}
          <div className="right_masg">
            <div className="right_text">
              <p>I'm Fine . Thank You</p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          <div className="right_masg">
            <div className="right_text">
              <p>
                Hey What's Your work progress. Please give me the final update.
                I want to show the work
              </p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* Right masg end */}
          {/* Left message start */}
          <div className="left_masg">
            <div className="left_image">
              <img src="./images/demo.jpg" alt="" />
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* left masg end */}
        </div>
      </div>
    </>
  );
};

export default Chatting;
