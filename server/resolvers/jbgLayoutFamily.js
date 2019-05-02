import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        jbgLayoutFamily: async (_root, { id }) =>
            await db.jbg_layout_family.findByPk(id),
        jbgLayoutFamilies: async (_root, _input, { user }) =>
            await db.jbg_layout_family.findAll(),
        jbgLayoutFamilyFilter: async (_root, { name }) => {
            //Case sensitive searching by name in sequelize
            //https://stackoverflow.com/questions/42352090/sequelize-find-all-that-match-contains-case-insensitive
            const families = await db.jbg_layout_family.findAll({
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
    JBGLayoutFamily: {
        jbg_layouts: async jbgLayoutFamily =>
            await db.jbg_layout.findAll({
                include: [
                    {
                        model: db.jbg_layout_family,
                        where: { id: jbgLayoutFamily.id }
                    }
                ]
            }),
        jbgLayoutsByType: async ({ id: jbgLayoutFamilyId }, { typeName }) => {
            const layoutTypes = await db.jbg_layout_type.findAll({
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
                const { id: jbgLayoutTypeId } = layoutTypes[0];
                return await db.jbg_layout.findAll({
                    where: {
                        jbgLayoutFamilyId,
                        jbgLayoutTypeId
                    }
                });
            } else {
                return [];
            }
        }
    }
};
