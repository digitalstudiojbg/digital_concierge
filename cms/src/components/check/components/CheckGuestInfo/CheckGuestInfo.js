import React from 'react';
import { FastField } from "formik"
import Box from "@material-ui/core/Box";
import CheckSection from "../CheckSection";
import CheckTextField from "../CheckTextField";
import { CHECK_FORM_NAMES } from "../../constants";

const CheckGuestInfo = () => (
    <CheckSection title="Guest Info">
        <Box display="flex">
            <Box maxWidth={110}>
                <FastField
                    name={CHECK_FORM_NAMES.guestCount}
                    render={({ field }) => (
                        <CheckTextField
                            {...field}
                            label="NUMBER OF PEOPLE"
                            type="number"
                            placeholder="2"
                        />
                    )}
                />
            </Box>

            <Box
                ml={4}
                maxWidth={118}
            >
                <FastField
                    name={CHECK_FORM_NAMES.roomNumber}
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
