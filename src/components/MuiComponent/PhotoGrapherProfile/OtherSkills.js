import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { EXPERTISE, INSTA_ID, PRICE, PRICE_VALUE, SKILLS } from "../consts/consts";
import TextInputFields from "../formsElement/TextInputFields";
import { Divider } from "@mui/material";
import SelectAutoComplete from "../formsElement/SelectAutoComplete";
import AutoCompleteWitCheckBox from "../formsElement/autoCompleteWithCheckBox";
const AddressType = [
    { label: "Business/Studio Address" },
    { label: "Personal Address" }
]

const OtherSkills = ({fieldsForm,control})=>{

    return(
        <>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, mt: 3, mb: 3 }}
            >
                {"Other information"}
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={2}>
                <Grid item xs={6} md={12}>
                    <AutoCompleteWitCheckBox {...fieldsForm[SKILLS]} />
                </Grid>
                <Grid item xs={6} md={12}>
                    <AutoCompleteWitCheckBox {...fieldsForm[EXPERTISE]} />
                </Grid>
                <Grid item xs={6} md={12}>
                    <SelectAutoComplete {...fieldsForm[PRICE]} />
                </Grid>
                <Grid item xs={6} md={12}>
                    <TextInputFields
                        id="outlined-textarea"
                        label="Price Value"
                        fullWidth={"true"}
                        {...fieldsForm[PRICE_VALUE]}
                    />
                </Grid>
                <Grid item xs={6} md={12}>
                    <TextInputFields
                        id="outlined-textarea"
                        label="Instagram Id"
                        fullWidth={"true"}
                        {...fieldsForm[INSTA_ID]}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default OtherSkills
