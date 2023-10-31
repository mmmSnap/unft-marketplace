
import { Grid } from "@mui/material"
import {useForm} from "react-hook-form";
import { useState } from "react";
import BasicDatePicker from "./DatePicker";


const START_DATE = 'start-date'
const END_DATE = 'end-date'

export const MuiDateComponent = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

     
    const form = useForm({
        mode: "onBlur",
        // defaultValues: {
        //     [START_DATE]: '' || "",
        //     [END_DATE]: '' || ""
        // },
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
            spacing={1}
        >
            <Grid item xs={6} spacing={1}>
                <BasicDatePicker
                    {...fieldsForm[START_DATE]}
                    label={"Start date"}
                    size="small"
                    minDate={new Date()}
                />
            </Grid>
            <Grid item xs={6} spacing={1}>
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