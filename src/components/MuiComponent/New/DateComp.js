import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const NewDatePickerComponent = (props) => {
    const [value, setValue] = React.useState(dayjs(new Date()));
    const { lable = "Start Date" } = props
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                slotProps={{ textField: { variant: "standard" } }}
                label={lable}
                value={value}
                onChange={(newValue) => setValue(newValue)}
            />

        </LocalizationProvider>
    );
}

export default NewDatePickerComponent
