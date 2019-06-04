import React from 'react';
import { Field } from "formik"
import CheckSection from "../CheckSection";
import CheckTextField from "../CheckTextField";

const CheckBooking = () => (
    <CheckSection title="Booking Status">
        <Field
            name="booking"
            render={({ field }) => (
                <CheckTextField
                    {...field}
                    placeholder="Booking ONLY"
                />
            )}
        />
    </CheckSection>
);

export default CheckBooking;
