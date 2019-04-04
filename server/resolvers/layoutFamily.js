import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        layoutFamily: async (_root, { id }) =>
            await db.layout_family.findByPk(id),
        layoutFamilies: async (_root, _input, { user }) =>
            await db.layout_family.findAll(),
        layoutFamilyFilter: async (_root, { name }) => {
            //Case sensitive searching by name in sequelize
            //https://stackoverflow.com/questions/42352090/sequelize-find-all-that-match-contains-case-insensitive
            const families = await db.layout_family.findAll({
                limit: 1,
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + name.toLowerCase() + "%"
                    )
                }
            });

            return families.length > 0 ? families[0] : null;
        }
    },
    LayoutFamily: {
        layouts: async layoutFamily =>
            await db.layout.findAll({
                include: [
                    {
                        model: db.layout_family,
                        where: { id: layoutFamily.id }
                    }
                ]
            }),
        layoutsByType: async ({ id: layoutFamilyId }, { typeName }) => {
            const layoutTypes = await db.layout_type.findAll({
                limit: 1,
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + typeName.toLowerCase() + "%"
                    )
                }
            });
            if (Array.isArray(layoutTypes) && layoutTypes.length > 0) {
                const { id: layoutTypeId } = layoutTypes[0];
                return await db.layout.findAll({
                    where: {
                        layoutFamilyId,
                        layoutTypeId
                    }
                });
            } else {
                return [];
            }
        }
    }
};
