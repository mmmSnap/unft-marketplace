import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Typography } from "@mui/material";
import useFilter from "./useFilter";
import Divider from "@mui/material/Divider";
import AutoCompleteWitCheckBox from "../users/forms/formsElement/autoCompleteWithCheckBox";
import SelectValueOnChange from "./selectFilter";
import {
  GENDER,
  EXPERTISE,
  SKILLS,
  PRICE,
  WITH_OR_WITOUT_STUDIO,
  RATING,
} from "../../../GlobalConst/consts";

const SearchFilterComponent = ({filterData}) => {
  const [show, setShow] = React.useState(false);
  let data = {
    [GENDER]: "",
  };

  const { fieldsForm,form } = useFilter();
  const {getValues} = form
 
   
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        // flexGrow:1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "85vw",
          margin: "20px 0px",
        }}
      >
        <Divider />
        <Grid xs={12} m="20px">
          <Stack direction="row" gap={1} onClick={() => setShow(!show)}>
            <Typography sx={{ fontWeight: "bold" }}>{"Filter Tab"}</Typography>

            {!show ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowDownIcon />
            )}
          </Stack>
        </Grid>
        {show && (
          <>
            {/* <Grid item xs={6} md={2}>
              <SelectValueOnChange
                fullWidth
                size={"small"}
                label="Gender"
                {...fieldsForm[GENDER]}
                defaultValue={data[GENDER]}
                filterData={filterData}
              />
            </Grid> */}
            {/* <Grid item md={2}>
              <SelectValueOnChange
                size={"small"}
                fullWidth
                label="Price"
                {...fieldsForm[PRICE]}
                defaultValue={data[GENDER]}
                filterData={filterData}
              />
            </Grid> */}
            <Grid item md={2}>
              <SelectValueOnChange
                size={"small"}
                label="Gender"
                {...fieldsForm[SKILLS]}
                defaultValue={data[GENDER]}
                filterData={filterData}
              />
            </Grid>
            <Grid item md={2}>
              <SelectValueOnChange
                size={"small"}
                label="Expertise"
                {...fieldsForm[EXPERTISE]}
                defaultValue={data[GENDER]}
                filterData={filterData}
              />
            </Grid>

            {/* <Grid item md={2}>
              <SelectValueOnChange
                size={"small"}
                label="Expertise"
                {...fieldsForm[WITH_OR_WITOUT_STUDIO]}
                defaultValue={data[GENDER]}
                filterData={filterData}
              />
            </Grid> */}
            <Grid item md={2}>
              <SelectValueOnChange
                size={"small"}
                label="With or Without Studio"
                {...fieldsForm[RATING]}
                defaultValue={data[GENDER]}
                filterData={filterData}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default SearchFilterComponent;