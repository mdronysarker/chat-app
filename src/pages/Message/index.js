import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";

const Message = () => {
  return (
    <>
      <div>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={4}>
            hiii
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
