import React from 'react';
import { Field } from "formik"
import { Box } from "@material-ui/core";
import CheckSection from "../CheckSection";
import CheckTextField from "../CheckTextField";

const CheckGuestInfo = () => (
    <CheckSection title="Guest Info">
        <Box display="flex">
            <Box maxWidth={110}>
                <Field
                    name="people_number"
                    render={({ field, form }) => (
                        <CheckTextField
                            {...field}
                            label="NUMBER OF PEOPLE"
                            type="number"
                            placeholder="2"
                            error={form.errors[field.name]}
                        />
                    )}
                />
            </Box>

            <Box
                ml={4}
                maxWidth={118}
            >
                <Field
                    name="room_number"
                    render={({ field }) => (
                        <CheckTextField
                            {...field}
                            label="Room Number"
                            type="number"
                            placeholder="66"
                        />
                    )}
                />
            </Box>
        </Box>

    </CheckSection>
);

export default CheckGuestInfo;
