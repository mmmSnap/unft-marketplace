import react, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { FormProvider } from "react-hook-form";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { Typography } from "@mui/material";
import {
  EMAIL_ID,
  ADDRESS_TYPE,
  EXPERTISE,
  FIRST_NAME,
  GENDER,
  LAST_NAME,
  COUNTRY_LIST,
  PHONE_NUMBER,
  PRICE,
  PRICE_VALUE,
  SKILLS,
  STUDIO_NAME,
  FLAT_HOUSE_NO,
  AREA_STREET,
  LAND_MARK,
  PINCODE,
  CITY,
  STATE,
} from "../consts/consts";
import TextInputFields from '../formsElement/TextInputFields';
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import SelectWithSearch from "../formsElement/SelectWithSearch";
import UseProfileForms from "./UseProfileForms";
// import CONST_FILE from "../../const/translation.json";
import SelectFields from "../formsElement/SelectWithSearch";
import CountrySelect from "../formsElement/selectControl";
import MaterialUIPickers from "../formsElement/DatePickerLocal";
import RowRadioButtonsGroup from "../formsElement/RadioButton";
import SelectAutoComplete from "../formsElement/SelectAutoComplete";
// import TextInputFields from './formsElement/TextInputFields'

const AddressType = [
  { label: "Business/Studio Address" },
  { label: "Personal Address" },
];

const AddressTypeComponent = ({ fieldsForm, control }) => {

  const [addType,setAddType] = useState('')
  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, mt: 4, mb: 3 }}
      >
        {"Address Type"}
      </Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      <Grid container spacing={2}>
        <Grid item xs={6} md={5}>
          <RowRadioButtonsGroup
            addressType={AddressType}
            setAddType={setAddType}
            control={control}
            fieldName={ADDRESS_TYPE}
            label={"Select Address Type"}
          />
        </Grid>
        {addType === "Business/Studio Address" && (
          <Grid item xs={12} md={10}>
            <FormHelperText>
              ProTip: This name will be displayed on your profile
            </FormHelperText>
            <TextInputFields
              id="outlined-textarea"
              label="Studio Name"
              fullWidth={"true"}
              {...fieldsForm[STUDIO_NAME]}
            />
          </Grid>
        )}
        <Grid item xs={12} md={10}>
          <TextInputFields
            id="outlined-textarea"
            label="Flat, House no. Building, Company, Apartment"
            // placeholder="Placeholder"
            fullWidth={"true"}
            {...fieldsForm[FLAT_HOUSE_NO]}
            // size="small"
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextInputFields
            id="outlined-textarea"
            label="Area, Street, Sector, Village"
            // placeholder="Placeholder"
            fullWidth={"true"}
            {...fieldsForm[AREA_STREET]}
            // size="small"
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextInputFields
            id="outlined-textarea"
            label="Landmark, Near by"
            // placeholder="Placeholder"
            fullWidth={"true"}
            {...fieldsForm[LAND_MARK]}
            // size="small"
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <TextInputFields
            id="outlined-textarea"
            label="Pincode"
            // placeholder="Placeholder"
            fullWidth={"true"}
            {...fieldsForm[PINCODE]}
            // size="s mall"
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <TextInputFields
            id="outlined-textarea"
            label="City"
            // placeholder="Placeholder"
            fullWidth={"true"}
            {...fieldsForm[CITY]}
            // size="small"
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <TextInputFields
            id="outlined-textarea"
            label="State"
            // placeholder="Placeholder"
            fullWidth={"true"}
            {...fieldsForm[STATE]}
            // size="small"
          />
        </Grid>
        <Grid item xs={6} md={5}>
          <SelectAutoComplete {...fieldsForm[COUNTRY_LIST]} />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressTypeComponent;
