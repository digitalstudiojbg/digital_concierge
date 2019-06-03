import React from 'react';
import { Field } from "formik"
import PropTypes from "prop-types";
import CheckSection from "../CheckSection";
import CheckTextField from "../CheckTextField";
import CheckPhone from "../CheckPhone";
import * as Yup from 'yup';

export const CheckReservationValidationSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email().required(),
    primary_number: Yup.number().required(),
    secondary_number: Yup.number().required(),
});

const CheckReservation = ({ isDisabled }) => (
    <CheckSection
        isDisabled={isDisabled}
        title="Reservation Details"
    >
        <Field
            name="firstname"
            render={({ field, form }) => (
                <CheckTextField
                    {...field}
                    label="FIRST NAME"
                    placeholder="Neal"
                    error={form.errors[field.name]}
                />
            )}
        />

        <Field
            name="lastname"
            render={({ field, form }) => (
                <CheckTextField
                    {...field}
                    label="SURNAME"
                    placeholder="66"
                    error={form.errors[field.name]}
                />
            )}
        />

       <CheckPhone name="primary_number" index={0} />

       <CheckPhone name="secondary_number" index={1} />

        <Field
            name="email"
            render={({ field, form }) => (
                <CheckTextField
                    {...field}
                    label="CONTACT EMAIL"
                    type="email"
                    placeholder="nealsbbq@johnbatman.com.au"
                    error={form.errors[field.name]}
                />
            )}
        />
    </CheckSection>
);

CheckReservation.propTypes = {
    isDisabled: PropTypes.bool,
};

export default CheckReservation;
