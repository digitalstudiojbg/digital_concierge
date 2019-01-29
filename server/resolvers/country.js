import db from "../models";

export default {
    Query: {
        country: async (_root, { id }) => await db.country.findByPk(id),
        countries: async () => await db.country.findAll()
    },
    Country: {
        states: async country =>
            await db.state.findAll({ where: { countryId: country.id } })
    }
};
