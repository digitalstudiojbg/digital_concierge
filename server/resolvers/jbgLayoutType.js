import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        jbgLayoutType: async (_root, { id }) =>
            await db.jbg_layout_type.findByPk(id),
        jbgLayoutTypes: async (_root, _input, { user }) =>
            await db.jbg_layout_type.findAll(),
        jbgLayoutTypeFilter: async (_root, { name }) => {
            //Case sensitive searching by name in sequelize
            //https://stackoverflow.com/questions/42352090/sequelize-find-all-that-match-contains-case-insensitive
            const types = await db.jbg_layout_type.findAll({
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
    JBGLayoutType: {
        jbg_layouts: async layoutType =>
            await db.jbg_layout.findAll({
                include: [
                    {
                        model: db.jbg_layout_type,
                        where: { id: layoutType.id }
                    }
                ]
            })
    }
};
