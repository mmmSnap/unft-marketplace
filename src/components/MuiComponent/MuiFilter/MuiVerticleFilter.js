import React from "react";
import Grid from "@mui/material/Grid";
import useFilter from "./useFilter";
import Divider from "@mui/material/Divider";
import SelectValueOnChange from "./selectFilter";
import {
    GENDER,
    EXPERTISE,
    SKILLS,
    PRICE,
    RATING,
} from "../../../GlobalConst/consts";

const MuiVerticleFilter = ({ filterData }) => {
    const [show, setShow] = React.useState(false);
    let data = {
        [GENDER]: "",
    };

    const { fieldsForm, form } = useFilter();
    const { getValues } = form


    return (

        <Grid
            container
            
            sx={{
                maxWidth: "100%",
                margin: "10px 0px",
                display:"flex",
                flexDirection: "column"
            }}
        >
        
            <>
                <Grid item md={12} mb="10px">
                    <SelectValueOnChange
                        size={"small"}
                        label="Gender"
                        {...fieldsForm[SKILLS]}
                        defaultValue={data[GENDER]}
                        filterData={filterData}
                    />
                </Grid>
                <Grid item md={12} mb="10px">
                    <SelectValueOnChange
                        size={"small"}
                        label="Expertise"
                        {...fieldsForm[EXPERTISE]}
                        defaultValue={data[GENDER]}
                        filterData={filterData}
                    />
                </Grid>

                <Grid item md={12} mb="10px">
                    <SelectValueOnChange
                        size={"small"}
                        label="With or Without Studio"
                        {...fieldsForm[RATING]}
                        defaultValue={data[GENDER]}
                        filterData={filterData}
                    />
                </Grid>
            </>

        </Grid>
    );
};

export default MuiVerticleFilter;