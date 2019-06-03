import React from 'react';
import DateRange from "@material-ui/icons/DateRange"
import DayJsUtils from '@date-io/dayjs';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import { CheckInput, CheckIconButton } from "../../check/components/CheckTextField/styled";
import { Box } from "@material-ui/core";

const DATE_PICKER_DEFAULT_FORMAT = "DD MMMM YYYY";

const DatePicker = ({ isTimePicker = false, ...props }) => {
    const Component = isTimePicker ? KeyboardTimePicker : KeyboardDatePicker;

    return (
        <MuiPickersUtilsProvider utils={DayJsUtils}>
            <Component
                disableUnderline={true}
                InputAdornmentComponent={DateRange}
                InputComponent={(
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
                            <InputAdornmentComponent />
                        </CheckIconButton>
                    </Box>
                )}
                format={DATE_PICKER_DEFAULT_FORMAT}
                {...props}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;
