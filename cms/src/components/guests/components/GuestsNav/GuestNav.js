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
    { path: "book", title: "Add booking" },
    { path: ROUTES.guestsCheckIn, title: "CHECK-IN" },
    { path: ROUTES.guestsCheckOut, title: "CHECK-OUT" }
];

const GuestsNav = () => (
    <Box
        display="flex"
        justifyContent="space-between"
    >
        <div>
            {
                NAV.map((nav) => (
                    <GuestsNavTab
                        key={nav.path}
                        textColor="primary"
                        indicatorColor="primary"
                        component={NavLink}
                        to={nav.path}
                        disabled={nav.disabled}
                        activeStyle={GuestsNavTabActiveStyle}
                        label={nav.title}
                    />
                ))
            }
        </div>

        <div>
            {
                NAV_SECONDARY.map((nav) => (
                    <Box
                        ml={2}
                        key={nav.path}
                        component={NavLink}
                        to={nav.path}
                    >
                        <GuestsNavButton variant="outlined">
                            {nav.title}
                        </GuestsNavButton>
                    </Box>
                ))
            }
        </div>
    </Box>
);

export default GuestsNav;
