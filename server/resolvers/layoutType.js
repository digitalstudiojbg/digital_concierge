import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        layoutType: async (_root, { id }) => await db.layout_type.findByPk(id),
        layoutTypes: async (_root, _input, { user }) =>
            await db.layout_type.findAll(),
        layoutTypeFilter: async (_root, { name }) => {
            //Case sensitive searching by name in sequelize
            //https://stackoverflow.com/questions/42352090/sequelize-find-all-that-match-contains-case-insensitive
            const types = await db.layout_type.findAll({
                limit: 1,
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + name.toLowerCase() + "%"
                    )
                }
            });

            return types.length > 0 ? types[0] : null;
        }
    },
    LayoutType: {
        layouts: async layoutType =>
            await db.layout.findAll({
                include: [
                    {
                        model: db.layout_type,
                        where: { id: layoutType.id }
                    }
                ]
            })
    }
};
