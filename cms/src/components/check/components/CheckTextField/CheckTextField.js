import React from 'react';
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { CheckInput, CheckInputError, CheckLabel } from "./styled";

const CheckTextField = ({ label, children, name, Component = CheckInput, error, ...props }) => (
    <Box
        mb={2.5}
        maxWidth={327}
    >
        {
            label && (
                <Box
                    component={CheckLabel}
                    htmlFor={name}
                    mb={1}
                >
                    {label}
                </Box>
            )
        }

        <Component
            id={name}
            disableUnderline={true}
            error={!!error}
            {...props}
        />

        {
            error && (
                <CheckInputError>{error}</CheckInputError>
            )
        }
    </Box>
);

CheckTextField.propTypes = {
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    Component: PropTypes.func,
};

export default CheckTextField;
