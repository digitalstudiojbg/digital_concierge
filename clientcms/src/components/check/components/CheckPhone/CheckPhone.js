import React from 'react';
import { Field } from "formik"
import PropTypes from "prop-types";
import CheckTextField from "../CheckTextField";

const CheckPhone = ({ index, name }) => (
    <Field
        name={name}
        render={({ field }) => (
            <CheckTextField
                {...field}
                label={`CONTACT NUMBER #${index + 1}`}
            />
        )}
    />
);

CheckPhone.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default CheckPhone;
