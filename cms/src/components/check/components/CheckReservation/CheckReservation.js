import React from 'react';
import * as Yup from 'yup';
import { Field} from "formik"
import PropTypes from "prop-types";

import CheckSection from "../CheckSection";
import CheckTextField from "../CheckTextField";
import CheckPhone from "../CheckPhone";
import { CHECK_FORM_NAMES } from "../../constants";

export const CheckReservationValidationSchema = Yup.object().shape({
    [CHECK_FORM_NAMES.firstname]: Yup.string().required(),
    [CHECK_FORM_NAMES.lastname]: Yup.string().required(),
    [CHECK_FORM_NAMES.email]: Yup.string().email().required(),
    [CHECK_FORM_NAMES.primaryNumber]: Yup.number().required(),
    [CHECK_FORM_NAMES.secondaryNumber]: Yup.number().required(),
});

const CheckReservation =  React.memo(({ isDisabled }) => (
    <CheckSection
        isDisabled={isDisabled}
        title="Reservation Details"
    >
        <Field
            name={CHECK_FORM_NAMES.firstname}
            render={({ field }) => (
                <CheckTextField
                    {...field}
                    label="FIRST NAME"
                    placeholder="Neal"
                />
            )}
        />

        <Field
            name={CHECK_FORM_NAMES.lastname}
            render={({ field }) => (
                <CheckTextField
                    {...field}
                    label="SURNAME"
                    placeholder="66"
                />
            )}
        />

       <CheckPhone
           name={CHECK_FORM_NAMES.primaryNumber}
           index={0}
       />

       <CheckPhone
           name={CHECK_FORM_NAMES.secondaryNumber}
           index={1}
       />

        <Field
            name={CHECK_FORM_NAMES.email}
            render={({ field }) => (
                <CheckTextField
                    {...field}
                    label="CONTACT EMAIL"
                    type="email"
                    placeholder="nealsbbq@johnbatman.com.au"
                />
            )}
        />
    </CheckSection>
));

CheckReservation.propTypes = {
    isDisabled: PropTypes.bool,
};

export default CheckReservation;
