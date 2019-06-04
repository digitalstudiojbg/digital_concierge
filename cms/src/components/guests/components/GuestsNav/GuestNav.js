import React from 'react';
import Box from "@material-ui/core/Box/index";
import { NavLink } from "react-router-dom";
import ROUTES from "../../../../utils/routes";
import {
    GuestsNavButton,
    GuestsNavTab,
    GuestsNavTabActiveStyle
} from "./styled";

const NAV = [
    { path: ROUTES.guests, title: "Current Guests" },
    { path: "1", title: "Device Calendar", disabled: true },
    { path: "2", title: "Guest Register", disabled: true },
];

const NAV_SECONDARY = [
    { path: "book", title: "Add booking", disabled: true },
    { path: ROUTES.guestsCheckIn, title: "CHECK-IN" },
    { path: ROUTES.guestsCheckOut, title: "CHECK-OUT" }
];

const GuestsNav = () => (
    <Box
        display="flex"
        justifyContent="space-between"
        borderBottom="2px solid #DDDDDD"
    >
        <div>
            {
                NAV.map((nav) => (
                    <GuestsNavTab
                        key={nav.path}
                        textColor="primary"
                        component={NavLink}
                        to={nav.path}
                        disabled={nav.disabled}
                        activeStyle={GuestsNavTabActiveStyle}
                        label={nav.title}
                    />
                ))
            }
        </div>

        <Box display="flex">
            {
                NAV_SECONDARY.map((nav) => (
                    <Box
                        ml={2}
                        key={nav.path}
                    >
                        <GuestsNavButton
                            component={NavLink}
                            to={nav.path}
                            variant="outlined"
                            disabled={nav.disabled}
                        >
                            {nav.title}
                        </GuestsNavButton>
                    </Box>
                ))
            }
        </Box>
    </Box>
);

export default GuestsNav;
