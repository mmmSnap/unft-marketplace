import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TabComponent from "../MuiTableComponent/TabComponent";
import axios from "axios";
import eventStatus from "../../../utils/eventStatus";
import { axionInstace } from "../../../globalServices/axionInstace";

const MyBookingComponent = () => {
  const [bookingList, setBookingList] = useState([]);
  const [upComingBooking, setUpcomingBooking] = useState([]);
  const [completedBooking, setCompletedBooking] = useState([]);
  const [isLoading,setIsLoading]  = useState(true)
  React.useEffect(() => {
    axionInstace
      .get("/booking")
      .then((response) => {
        const bookingListItems = response?.data?.items;
        const comingBooking = [];
        const oldBooking = [];
        for (let bookingItem of bookingListItems) {
          if (eventStatus(bookingItem.to) === "Up-coming") {
            comingBooking.push(bookingItem);
          } else {
            oldBooking.push(bookingItem);
          }
        }
        setBookingList(response?.data?.items || []);
        setUpcomingBooking(comingBooking);
        setCompletedBooking(oldBooking);
        setIsLoading(false)
      })
      .catch((e) => {
        console.log();
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",

        width: "100vw",
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          mt: 10,
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="div"
            textAlign={"center"}
            sx={{ margin: "20px 0px" }}
          >
            {"My Booking Table"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
         
          <TabComponent
            bookingList={bookingList}
            upComingBooking={upComingBooking}
            completedBooking={completedBooking}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyBookingComponent;
