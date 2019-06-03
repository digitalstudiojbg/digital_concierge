import React from 'react';
import { FastField } from "formik"
import Box from "@material-ui/core/Box";
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

        <FastField
            name={name}
            render={({ field }) => (
                <CheckTextField
                    {...field}
                    label={`CONTACT NUMBER #${index + 1}`}
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
