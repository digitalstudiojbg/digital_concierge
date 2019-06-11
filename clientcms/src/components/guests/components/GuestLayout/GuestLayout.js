import React from 'react';
import styled from "styled-components/macro";
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ROUTES from "../../../../utils/routes";

const GuestsLayoutTitle = styled("h1")`
    color: #43425D;
    font-family: Source Sans Pro, Bold;
    font-size: 28px;
    margin-bottom: 0;
`;

const GuestsLayoutDot = styled(Box)`
    background-color: #2699FB;
    border-radius: 100%;
    color: #fff;
    font-size: 14px;
    width: 18px;
    height: 18px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const GuestsLayoutWrapper = styled.div`
    overflow: auto;
`;

const GuestsLayout = (
    {
        children,
        title,
        isShowCancel,
        match: { params: { system_id } }
    },
) => (
    <GuestsLayoutWrapper>
        <Box
            pl={5}
            pt={4}
            flex={1}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <GuestsLayoutTitle>{title}</GuestsLayoutTitle>
                    <GuestsLayoutDot ml={1.5}>
                        <span>i</span>
                    </GuestsLayoutDot>
                </Box>

                {
                    isShowCancel && (
                        <Button
                            component={Link}
                            to={ROUTES.guests(system_id)}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                    )
                }
            </Box>

            { children }
        </Box>
    </GuestsLayoutWrapper>
);

GuestsLayout.propTypes = {
    title: PropTypes.string.isRequired,
    isShowCancel: PropTypes.bool,
};


export default withRouter(GuestsLayout);
