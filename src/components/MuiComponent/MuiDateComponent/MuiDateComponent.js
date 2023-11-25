
import moment from "moment";
import { Grid } from "@mui/material"
import {useForm} from "react-hook-form";
import { useState } from "react";
import BasicDatePicker from "./DatePicker";

const START_DATE = 'startDate'
const END_DATE = 'endDate'

export const MuiDateComponent = (props) => {

    const {colSize=6, mt=2,fieldsForm} = props



    return (
        <Grid
            container
            spacing={2}
            sx={{mt}}
        >
            <Grid item xs={colSize} spacing={1}>
                <BasicDatePicker
                    {...fieldsForm[START_DATE]}
                    label={"Start date"}
                    size="small"
                    minDate={new Date()}
                />
            </Grid>
            <Grid item xs={colSize} spacing={1}>
                <BasicDatePicker
                    {...fieldsForm[END_DATE]}
                    label={"End date"}
                    size="small"
                    minDate={new Date()}
                />
            </Grid>
        </Grid>
    )

}

export default MuiDateComponent