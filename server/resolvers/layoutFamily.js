import db from "../models";

export default {
    Query: {
        layoutFamily: async (_root, { id }) =>
            await db.layoutFamily.findByPk(id),
        layoutFamilies: async (_root, _input, { user }) =>
            await db.layoutFamily.findAll()
    },
    Layout: {
        layouts: async layoutFamily =>
            await db.layout.findAll({
                include: [
                    {
                        model: db.layout_family,
                        where: { id: layoutFamily.id }
                    }
                ]
            })
    }
};
