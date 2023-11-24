
import moment from "moment";
import { Grid } from "@mui/material"
import {useForm} from "react-hook-form";
import { useState } from "react";
import BasicDatePicker from "./DatePicker";

const START_DATE = 'start-date'
const END_DATE = 'end-date'

export const MuiDateComponent = (props) => {

    const {colSize=6, mt=2} = props

    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            [START_DATE]:  moment(new Date()).format('MM/DD/YYYY'),
            [END_DATE]:  moment(new Date())
        },
    });
    const {
        register,
        control,
        getValues,
        formState: {errors},
    } = form;
    const fieldsForm = {
       
        [START_DATE]: {
            require,
            fieldName: START_DATE,
            control,
        },
        [END_DATE]: {
            require,
            fieldName: END_DATE,
            control,
        },
    };

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