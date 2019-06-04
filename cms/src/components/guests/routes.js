import React from "react";
import ROUTES from "../../utils/routes";
import GuestsCurrent from "./components/GuestsCurrent";
import CheckIn from "../check/CheckIn";
import GuestsLayout from "./components/GuestLayout";
import CheckOut from "../check/CheckOut";

const routes = [
    {
        path: ROUTES.guestsCheckIn,
        component: () => (
            <GuestsLayout
                title="Guest Check-in"
                isShowCancel
            >
                <CheckIn />
            </GuestsLayout>
        ),
    },
    {
        path: ROUTES.guestsCheckOut,
        component: () => (
            <GuestsLayout
                title="Guest Check-out"
                isShowCancel
            >
                <CheckOut />
            </GuestsLayout>
        ),
    },
    {
        path: "/",
        component: GuestsCurrent,
    },
];

export default routes;
