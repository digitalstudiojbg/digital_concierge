import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        layout: async (_root, { id }) => await db.layout.findByPk(id),
        layouts: async (_root, _input, { user }) => await db.layout.findAll(),
        layoutsFromFamilyAndType: async (
            _root,
            { familyId, typeId },
            { user }
        ) =>
            await db.layout.findAll({
                where: {
                    layoutFamilyId: familyId,
                    layoutTypeId: typeId
                }
            }),
        layoutsFromType: async (_root, { typeName }) => {
            const type = await db.layout_type.findOne({
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + typeName.toLowerCase() + "%"
                    )
                }
            });

            if (Boolean(type)) {
                const { id: layoutTypeId } = type;
                return await db.layout.findAll({
                    where: {
                        layoutTypeId
                    }
                });
            } else {
                return [];
            }
        }
    },
    Layout: {
        templates: async layout =>
            await db.template.findAll({
                include: [
                    {
                        model: db.layout,
                        where: { id: layout.id }
                    }
                ]
            }),
        media: async layout => await db.media.findByPk(layout.mediumId),
        layout_family: async layout =>
            await db.layout_family.findByPk(layout.layoutFamilyId),
        layout_type: async layout =>
            await db.layout_type.findByPk(layout.layoutTypeId)
    }
};
