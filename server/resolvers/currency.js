import db from "../models";

export default {
    Query: {
        currency: async (_root, { id }) => await db.currency.findByPk(id),
        currencies: async () => await db.currency.findAll()
    },
    Currency: {
        countries: async country =>
            await db.currency.findAll({
                include: [
                    {
                        model: db.country,
                        where: { id: country.id }
                    }
                ]
            })
    }
};
