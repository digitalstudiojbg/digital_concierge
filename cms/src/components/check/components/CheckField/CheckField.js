import React from 'react';
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

const CheckField = ({ title, children, ...props }) => (
    <Box {...props}>
        <Box
            mb={1}
            fontWeight="bold"
            fontSize={10}
            color="#5C5C5C"
        >
            {title}
        </Box>
        <Box>
            {children}
        </Box>
    </Box>
);

CheckField.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};

export default CheckField;
