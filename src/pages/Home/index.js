import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Searchbox from "../../components/searchbox";
import Grouplist from "../../components/grouplists";
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
        </Grid>
        <Grid item xs={4} className="home_items">
          mid
        </Grid>
        <Grid item xs={4} className="home_items">
          right
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
