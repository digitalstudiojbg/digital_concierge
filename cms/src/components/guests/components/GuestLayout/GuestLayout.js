import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core/index";
import Button from "@material-ui/core/Button";
import ROUTES from "../../../../utils/routes";

const GuestsLayoutTitle = styled("h1")`
    color: #43425D;
    font-family: Source Sans Pro, Bold;
    font-size: 28px;
`;

const GuestsLayoutDot = styled(Box)`
    background-color: #2699FB;
    border-radius: 100%;
    color: #fff;
    font-size: 14px;
    width: 18px;
    height: 18px;
    align-items: center;
    justifyContent: center;
    text-align: center;
`;

const GuestsLayout = ({ children, title, isShowCancel }) => (
    <Box
        pl={5}
        pt={4}
        flex={1}
        pr={5}
    >
        <Box
            mb={5.5}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box
                display="flex"
                alignItems="center"
            >
                <GuestsLayoutTitle>{title}</GuestsLayoutTitle>
                <GuestsLayoutDot
                    ml={1.5}
                    mt={-1.5}
                >
                    <span>i</span>
                </GuestsLayoutDot>
            </Box>

            {
                isShowCancel && (
                    <Button
                        component={Link}
                        to={ROUTES.guests}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                )
            }
        </Box>

        { children }
    </Box>
);

GuestsLayout.propTypes = {
    title: PropTypes.string.isRequired,
    isShowCancel: PropTypes.bool,
};


export default GuestsLayout;
