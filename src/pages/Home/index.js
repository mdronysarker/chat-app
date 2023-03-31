import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Searchbox from "../../components/searchbox";
import Grouplist from "../../components/grouplists";
import Friendrequest from "../../components/friendrequest";
import Friend from "../../components/friends";
import Mygroups from "../../components/mygroups";
const Home = () => {
  return (
    <>
      <Grid container className="home_pages">
        <Grid item xs={4} className="home_items">
          <div>
            <Searchbox />
          </div>
          <div>
            <Grouplist />
          </div>
          <div>
            <Friendrequest />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Friend />
          </div>
          <div>
            <Mygroups />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          right
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
