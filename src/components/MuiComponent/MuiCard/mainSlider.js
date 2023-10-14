import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MediaCard from "./card";
import TestSwiper from "./test";

const MainSliderComponent = (props) => {
    const {searchResult,bookNowHandler} = props
  return (
    <Box sx={{ minWidth: "90vw",margin: "20px 30px" }}>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        // sx={{ margin: "0 40px" }}
      >
       
        {searchResult && searchResult.map((items)=>{
            return (
                <Grid item xs={3} md={3}>
                <MediaCard name={items?.name||''} items={items} bookNowHandler={bookNowHandler} />
              </Grid>  
            ) 
        })}

      </Grid>
    </Box>
  );
};

export default MainSliderComponent;
