import React from 'react';
import { Field } from "formik"
import PropTypes from "prop-types";

import CheckSection from "../CheckSection";
import CheckTextField from "../CheckTextField";
import CheckPhone from "../CheckPhone";
import { CHECK_FORM_NAMES } from "../../constants";

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
                    placeholder="Nick"
                />
            )}
        />

        <Field
            name={CHECK_FORM_NAMES.lastname}
            render={({ field }) => (
                <CheckTextField
                    {...field}
                    label="SURNAME"
                    placeholder="Fury"
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
