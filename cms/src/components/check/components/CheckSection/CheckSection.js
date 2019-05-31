import React from 'react';
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import styled, { css } from "styled-components";

const CheckSectionTitle = styled("h3")`
    color: #2699FB;
    font-weight: bold;
    margin-bottom: 35px;
`;

const CheckSectionBox = styled(Box)`
  ${props => props.isDisabled && css`
    pointer-events: none;
    opacity: 0.8;
  `}
`;

const CheckSection = ({ title, children, isDisabled }) => (
    <CheckSectionBox mt={5.5}>
        <CheckSectionTitle>{title}</CheckSectionTitle>
        <Box>
            {children}
        </Box>
    </CheckSectionBox>
);

CheckSection.propTypes = {
    title: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
};

export default CheckSection;
