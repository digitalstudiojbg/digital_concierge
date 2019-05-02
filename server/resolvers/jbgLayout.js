import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        jbgLayout: async (_root, { id }) => await db.jbg_layout.findByPk(id),
        jbgLayouts: async (_root, _input, { user }) =>
            await db.jbg_layout.findAll(),
        jbgLayoutsFromFamilyAndType: async (
            _root,
            { familyId, typeId },
            { user }
        ) =>
            await db.jbg_layout.findAll({
                where: {
                    jbgLayoutFamilyId: familyId,
                    jbgLayoutTypeId: typeId
                }
            }),
        jbgLayoutsFromType: async (_root, { typeName }) => {
            const type = await db.jbg_layout_type.findOne({
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + typeName.toLowerCase() + "%"
                    )
                }
            });

            if (Boolean(type)) {
                const { id: jbgLayoutTypeId } = type;
                return await db.jbg_layout.findAll({
                    where: {
                        jbgLayoutTypeId
                    }
                });
            } else {
                return [];
            }
        }
    },
    JBGLayout: {
        jbg_templates: async jbg_layout =>
            await db.jbg_template.findAll({
                include: [
                    {
                        model: db.jbg_layout,
                        where: { id: jbg_layout.id }
                    }
                ]
            }),
        media: async jbg_layout => await db.media.findByPk(jbg_layout.mediumId),
        jbg_layout_family: async jbg_layout =>
            await db.jbg_layout_family.findByPk(jbg_layout.jbgLayoutFamilyId),
        jbg_layout_type: async jbg_layout =>
            await db.jbg_layout_type.findByPk(jbg_layout.jbgLayoutTypeId)
    }
};
