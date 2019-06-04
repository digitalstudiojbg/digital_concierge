import React from 'react';
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { CheckLabel } from "../CheckTextField/styled";
import { CheckCheckbox } from "../styled";

const CheckTimeFormCheckbox = React.memo(({ id, label, ...props }) => (
    <Box
        display="flex"
        alignItems="center"
        ml={2}
    >
        <CheckCheckbox
            color="primary"
            id={id}
            {...props}
        />

        <Box
            ml={1}
            mt="1px"
        >
            <CheckLabel htmlFor={id}>
                {label}
            </CheckLabel>
        </Box>
    </Box>
));

CheckTimeFormCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default CheckTimeFormCheckbox;
