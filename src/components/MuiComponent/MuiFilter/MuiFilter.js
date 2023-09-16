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

const MuiFilter = ({ filterData }) => {
    const [show, setShow] = React.useState(false);
    let data = {
        [GENDER]: "",
    };

    const { fieldsForm, form } = useFilter();
    const { getValues } = form


    return (

        <Grid
            container
            spacing={2}
            sx={{
                maxWidth: "85vw",
                margin: "20px 0px",
            }}
        >
            <Divider />
            <>
   <Grid item md={3}>
                    <SelectValueOnChange
                        size={"small"}
                        label="Gender"
                        {...fieldsForm[SKILLS]}
                        defaultValue={data[GENDER]}
                        filterData={filterData}
                    />
                </Grid>
                <Grid item md={3}>
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
                <Grid item md={3}>
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

export default MuiFilter;