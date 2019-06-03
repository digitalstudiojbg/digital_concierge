import React, { memo } from 'react';
import { connect } from 'formik';
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { CheckInput, CheckInputError, CheckLabel } from "./styled";

const CheckTextField = memo((
    {
        label,
        children,
        name,
        Component = CheckInput,
        formik,
        ...props
    },
) => {
    const { errors, touched } = formik;
    const error = errors[name];
    const touch = touched[name];
    const isShowError = Boolean(touch && error);

    return (
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
                name={name}
                disableUnderline={true}
                error={isShowError}
                {...props}
            />

            {
                isShowError && (
                    <CheckInputError>{error}</CheckInputError>
                )
            }
        </Box>
    )
});

CheckTextField.propTypes = {
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    Component: PropTypes.func,
};

export default connect(CheckTextField);
