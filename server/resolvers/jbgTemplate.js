import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        jbgTemplate: async (_root, { id }) => {
            return await db.jbg_template.findByPk(id);
        },
        jbgTemplates: async (_root, _input, { user }) => {
            return await db.jbg_template.findAll();
        },
        jbgTemplateByType: async (_root, { typeName }) => {
            const type = await db.jbg_template_type.findOne({
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + typeName.toLowerCase() + "%"
                    )
                }
            });

            if (Boolean(type)) {
                const { id: jbgTemplateTypeId } = type;
                return await db.jbg_template.findAll({
                    where: {
                        jbgTemplateTypeId
                    }
                });
            } else {
                return [];
            }
        }
    },
    JBGTemplate: {
        jbg_layouts: async jbg_template =>
            db.jbg_layout.findAll({
                include: [
                    {
                        model: db.jbg_template,
                        where: { id: jbg_template.id }
                    }
                ]
            }),
        jbg_template_type: async jbg_template =>
            db.jbg_template_type.findByPk(jbg_template.jbgTemplateTypeId),
        validations: async jbg_template =>
            await db.validation.findAll({
                include: [
                    {
                        model: db.jbg_template,
                        where: { id: jbg_template.id }
                    }
                ]
            })
    }
};
