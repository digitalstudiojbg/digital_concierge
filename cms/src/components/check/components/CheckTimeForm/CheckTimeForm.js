import React from 'react';
import PropTypes from "prop-types";
import { Field } from "formik"
import CheckSection from "../CheckSection";
import DatePicker from "../../../shared/DatePicker";
import TimePicker from "../../../shared/TimePicker";
import CheckTextField from "../CheckTextField";
import Box from "@material-ui/core/Box";
import CheckTimeFormCheckbox from "./CheckTimeFormCheckbox";

const NOW = new Date();

const isEqualTime = (d1, d2) => {
    const getHHPlusMM = (d) => d.getMinutes() + d.getHours();
    return getHHPlusMM(d1) === getHHPlusMM(d2);
};

const CheckTimeForm = (
    {
        title,
        basename,
        isShowCurrentCheckboxes,
        minDate,
        maxDate,
    },
) => (
    <CheckSection title={title}>
        <Box display="flex">
            <Field
                name={`${basename}_date`}
                render={({ field, form }) => (
                    <>
                        <CheckTextField
                            {...field}
                            onChange={(date) => form.setFieldValue(field.name, date)}
                            label="CHECK-IN DATE"
                            Component={DatePicker}
                            minDate={minDate}
                            maxDate={maxDate}
                        />

                        {
                            isShowCurrentCheckboxes && (
                                <CheckTimeFormCheckbox
                                    label="CURRENT DATE"
                                    id={`${field.name}_cb`}
                                    onChange={({ target: { checked }}) =>
                                        checked && form.setFieldValue(field.name, NOW)
                                    }
                                    checked={field.value.getDate() === NOW.getDate()}
                                />
                            )
                        }
                    </>
                )}
            />
        </Box>

        <Box display="flex">
            <Field
                name={`${basename}_date_time`}
                render={({ field, form }) => (
                    <>
                        <CheckTextField
                            {...field}
                            onChange={(date) => form.setFieldValue(field.name, date)}
                            label="CHECK-IN TIME"
                            Component={TimePicker}
                            minDate={minDate}
                            maxDate={maxDate}
                        />

                        {
                            isShowCurrentCheckboxes && (
                                <CheckTimeFormCheckbox
                                    label="CURRENT TIME"
                                    id={`${field.name}_cb`}
                                    onChange={({ target: { checked }}) =>
                                        checked && form.setFieldValue(field.name, NOW)
                                    }
                                    checked={isEqualTime(field.value, NOW)}
                                />
                            )
                        }
                    </>
                )}
            />
        </Box>
    </CheckSection>
);

CheckTimeForm.propTypes = {
    title: PropTypes.string.isRequired,
    basename: PropTypes.string.isRequired,
    isShowCurrentCheckboxes: PropTypes.bool,
};

export default CheckTimeForm;
