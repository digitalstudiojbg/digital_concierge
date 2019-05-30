import React from 'react';
import PropTypes from 'prop-types';
import { Box } from "@material-ui/core";

const GuestsLayout = ({ children, title }) => (
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

        { children }
    </Box>
);

GuestsLayout.propTypes = {
    title: PropTypes.string.isRequired,
};


export default GuestsLayout;
