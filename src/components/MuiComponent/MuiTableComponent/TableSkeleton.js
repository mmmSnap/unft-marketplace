import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const TableSkeleton = () => {
  return (
    <Box sx={{ width: "100%", height: "400px" }}>
      <Skeleton variant="text" sx={{ fontSize: "1rem", padding: "10px" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", padding: "10px" }} />
      <Skeleton animation="wave" height="100px" variant={"rounded"} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", padding: "10px" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", padding: "10px" }} />
      <Skeleton animation="wave" height="100px" variant={"rounded"} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", padding: "10px" }} />
    </Box>
  );
};

export default TableSkeleton;
