import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Searchbox from "../../components/searchbox";
import Grouplist from "../../components/grouplists";
import Friendrequest from "../../components/friendrequest";
import Friend from "../../components/friends";
import Mygroups from "../../components/mygroups";
import Userlists from "../../components/userlist";
import Blockusers from "../../components/blockuser";
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
          <div>
            <Userlists />
          </div>
          <div>
            <Blockusers />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
