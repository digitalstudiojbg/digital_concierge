import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core/index";
import Button from "@material-ui/core/Button";
import ROUTES from "../../../../utils/routes";

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
                <h1 className='section-name'>{title}</h1>
                <Box
                    ml={1.5}
                    mt={-1.5}
                    className='dot info-box'
                    fontSize={14}
                    width={18}
                    height={18}
                    alignItems="center"
                    justifyContent="center"
                >
                    <span>i</span>
                </Box>
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
