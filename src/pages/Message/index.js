import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Masggrp from "../../components/messagegrp";

const Message = () => {
  return (
    <>
      <div>
        <Grid container justifyContent={"space-between"} marginTop={2}>
          <Grid item xs={4} className="masg-item">
            <Masggrp />
          </Grid>
          <Grid item xs={7}>
            hii
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Message;
