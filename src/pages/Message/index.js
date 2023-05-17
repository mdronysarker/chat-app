import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Masggrp from "../../components/messagegrp";
import Friend from "../../components/friends";
import Chatting from "../../components/chatting";

const Message = () => {
  return (
    <>
      <div>
        <Grid container justifyContent={"space-between"} marginTop={2}>
          <Grid item xs={4} className="masg-item">
            <Masggrp />
            <Friend />
          </Grid>
          <Grid item xs={7}>
            <Chatting />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Message;
