import * as React from "react";
import moment from "moment";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function BasicDatePicker(props) {
    //   const [currentDate, setCurrentDate] = React.useState(moment().format("YYYY-MM-DD"));
    const { control, fieldName, label, size = "large", minDate, ...rest } = props;
    return (
        <Controller
            control={control}
            name={fieldName}
            rules={rest.require || {
                required: {
                    value: true,
                    message: "This fields is required",

                },
                pattern: {
                  value:/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                  message: "Invalid Date ",

                }
            }}
            render={({ field, fieldState: { error } }) => {
                const { value } = field
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slotProps={{ textField: { variant: "standard" } }}
                            label={label}
                            value={dayjs(new Date(value))}
                            minDate={dayjs(new Date())}
                            onChange={(newValue) => field.onChange(newValue)}
                        />

                    </LocalizationProvider>
                );
            }}
        />
    );
}
