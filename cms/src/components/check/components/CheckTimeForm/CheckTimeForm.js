import React, { useCallback } from 'react';
import { connect, Field } from 'formik';
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import dayjs from "dayjs";

import CheckSection from "../CheckSection";
import DatePicker from "../../../shared/DatePicker";
import TimePicker from "../../../shared/TimePicker";
import CheckTextField from "../CheckTextField";
import CheckTimeFormCheckbox from "./CheckTimeFormCheckbox";

const NOW = dayjs(new Date());

const isEqualTime = (d1, d2) => {
    const getHHPlusMM = (d) => d.minute() + d.hour();
    return getHHPlusMM(d1) === getHHPlusMM(d2);
};

const CheckTimeForm = React.memo((
    {
        title,
        basename,
        basenameTitle,
        isShowCurrentCheckboxes,
        minDate,
        maxDate,
        formik: { setFieldValue },
    },
) => {
    const nameDate = `${basename}_date`;
    const nameTime = `${basename}_date_time`;

    const handleDatepicker = useCallback(date => setFieldValue(nameDate, date), []);
    const handleTimepicker = useCallback(date => setFieldValue(nameTime, date), []);

    const handleDateCheckbox = useCallback(() => handleDatepicker(NOW), []);
    const handleTimeCheckbox = useCallback(() => handleTimepicker(NOW), []);

    const isCurrentDay = useCallback(day => dayjs(day).day() === NOW.day(), []);
    const isCurrentTime = useCallback(day => isEqualTime(day, NOW), []);

    const isDisabledCheckbox = minDate.diff(NOW) > 0;

    return (
        <CheckSection title={title}>
            <Box display="flex">
                <Field
                    name={nameDate}
                    render={({ field }) => (
                        <>
                            <CheckTextField
                                {...field}
                                onChange={handleDatepicker}
                                label={`${basenameTitle} DATE`}
                                Component={DatePicker}
                                minDate={minDate}
                                maxDate={maxDate}
                            />

                            {
                                isShowCurrentCheckboxes ? (
                                    <CheckTimeFormCheckbox
                                        label="CURRENT DATE"
                                        id={`${field.name}_cb`}
                                        disabled={isDisabledCheckbox}
                                        onClick={handleDateCheckbox}
                                        checked={isCurrentDay(field.value)}
                                    />
                                ): <span />
                            }
                        </>
                    )}
                />
            </Box>

            <Box display="flex">
                <Field
                    name={nameTime}
                    render={({ field }) => (
                        <>
                            <CheckTextField
                                {...field}
                                onChange={handleTimepicker}
                                label={`${basenameTitle} TIME`}
                                Component={TimePicker}
                                minDate={minDate}
                                maxDate={maxDate}
                            />

                            {
                                isShowCurrentCheckboxes ? (
                                    <CheckTimeFormCheckbox
                                        label="CURRENT TIME"
                                        id={`${field.name}_cb`}
                                        onClick={handleTimeCheckbox}
                                        disabled={isDisabledCheckbox}
                                        checked={isCurrentTime(field.value)}
                                    />
                                ) :  <span />
                            }
                        </>
                    )}
                />
            </Box>
        </CheckSection>
    );
});

CheckTimeForm.propTypes = {
    title: PropTypes.string.isRequired,
    basenameTitle: PropTypes.string.isRequired,
    basename: PropTypes.string.isRequired,
    isShowCurrentCheckboxes: PropTypes.bool,
};

export default connect(CheckTimeForm);
