import React from 'react';
import DateRange from "@material-ui/icons/DateRange"
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import { CheckInput, CheckIconButton } from "../../check/components/CheckTextField/styled";
import Box from "@material-ui/core/Box";

const DATE_PICKER_DEFAULT_FORMAT = "DD MMMM YYYY";

const DatePickerInputComponent = (
    {
        InputAdornmentComponent,
        inputValue,
        onClick,
        validationError,
        ...props
    }
) => (
    <Box display="flex">
        <Box mr={1.5}>
            <CheckInput
                value={inputValue}
                {...props}
            />
        </Box>
        <CheckIconButton onClick={onClick}>
            <InputAdornmentComponent fontSize="large" />
        </CheckIconButton>
    </Box>
);

const DatePicker = ({ isTimePicker = false, ...props }) => {
    const Component = isTimePicker ? KeyboardTimePicker : KeyboardDatePicker;

    return (
        <Component
            disableUnderline={true}
            InputAdornmentComponent={DateRange}
            InputComponent={DatePickerInputComponent}
            format={DATE_PICKER_DEFAULT_FORMAT}
            {...props}
        />
    );
};

export default DatePicker;
