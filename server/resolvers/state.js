import db from "../models";

export default {
    Query: {
        state: async (_root, { id }) => await db.state.findByPk(id),
        states: async () => await db.state.findAll()
    },
    State: {
        country: async state => {
            return await db.country.findByPk(state.countryId);
        },
        venue_clients: async state =>
            await db.client.findAll({ where: { venueStateId: state.id } }),
        postal_clients: async state =>
            await db.client.findAll({ where: { venueStateId: state.id } })
    }
};
