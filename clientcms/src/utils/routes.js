const ROUTES = {
    guests: (id = ":system_id") => `/system/${id}/guests`,
    guestsCheckIn: (id = ":system_id") => `/system/${id}/guests/check-in`,
    guestsCheckOut: (id = ":system_id") => `/system/${id}/guests/check-out`,
};

export default ROUTES;
