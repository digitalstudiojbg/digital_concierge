import React from "react";
import ROUTES from "../../utils/routes";
import GuestsCurrent from "./components/GuestsCurrent";

const routes = [
    {
        path: ROUTES.guestsCheckIn,
        component: () => <div>Check in</div>,
    },
    {
        path: ROUTES.guestsCheckOut,
        component: () => <div>Check out</div>,
    },
    {
        path: "/",
        component: GuestsCurrent,
    }
];

export default routes;
