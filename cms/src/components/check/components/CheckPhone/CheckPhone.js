import React from 'react';
import { Field } from "formik"
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import CheckTextField from "../CheckTextField";
import { CheckLabel } from "../CheckTextField/styled";

const CheckPhone = ({ index, name }) => (
    <Box maxWidth={327}>
        {/*<Box mb={1}>*/}
        {/*    <CheckLabel>*/}
        {/*        CONTACT NUMBER #{index + 1}*/}
        {/*    </CheckLabel>*/}
        {/*</Box>*/}

        <Field
            name={name}
            render={({ field, form }) => (
                <CheckTextField
                    {...field}
                    label={`CONTACT NUMBER #${index + 1}`}
                    error={form.errors[field.name]}
                    placeholder="+61 0425 872 504"
                />
            )}
        />


        {/*<Box display="flex">*/}
        {/*    <Box maxWidth={90} mr={1}>*/}
        {/*        <Field*/}
        {/*            name={`phoneNumber_${index}_area`}*/}
        {/*            render={({ field, form }) => (*/}
        {/*                <CheckTextField*/}
        {/*                    {...field}*/}
        {/*                    label="AREA"*/}
        {/*                    error={form.errors[field.name]}*/}
        {/*                />*/}
        {/*            )}*/}
        {/*        />*/}
        {/*    </Box>*/}

        {/*    <Box flex={1}>*/}
        {/*        <Field*/}
        {/*            name={`phoneNumber_${index}_number`}*/}
        {/*            render={({ field, form }) => (*/}
        {/*                <CheckTextField*/}
        {/*                    {...field}*/}
        {/*                    label="NUMBER"*/}
        {/*                    error={form.errors[field.name]}*/}
        {/*                />*/}
        {/*            )}*/}
        {/*        />*/}
        {/*    </Box>*/}
    </Box>
);

CheckPhone.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default CheckPhone;
