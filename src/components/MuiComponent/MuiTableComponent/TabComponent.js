import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import CustomizedTables from "./CustomizedTables";
import TableSkeleton from "./TableSkeleton";

const TabListContent = {
  TabItem: ["Current", "Old", "All"],
  TabList: [],
};

const TabComponent = (props) => {
  const [value, setValue] = React.useState("1");

  const { bookingList,completedBooking,upComingBooking,isLoading } = props;
  const handleChange = (event, newValue) => {
    console.log("check-value", newValue);
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Upcoming Bookings" value="1" />
            <Tab label="Completed Bookings" value="2" />
            <Tab label="All Bookings" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{padding:"30px 0px"}}>
            {isLoading?(<TableSkeleton />):
           (<CustomizedTables bookingList={upComingBooking} />)}
        </TabPanel>
        <TabPanel value="2" sx={{padding:"30px 0px"}}>
        <CustomizedTables  bookingList={completedBooking} />
        </TabPanel>
        <TabPanel value="3" sx={{padding:"30px 0px"}}>
        <CustomizedTables  bookingList={bookingList} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabComponent;
