import React from 'react';
import AccessTime from "@material-ui/icons/AccessTime"
import DatePicker from "../DatePicker";

const TIME_PICKER_DEFAULT_FORMAT = "hh:mma";

const TimePicker = (props) => (
    <DatePicker
        isTimePicker={true}
        InputAdornmentComponent={AccessTime}
        format={TIME_PICKER_DEFAULT_FORMAT}
        {...props}
    />
);

export default TimePicker;
