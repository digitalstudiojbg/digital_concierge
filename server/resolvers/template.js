import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        template: async (_root, { id }) => {
            return await db.template.findByPk(id);
        },
        templates: async (_root, _input, { user }) => {
            return await db.template.findAll();
        },
        templatesByType: async (_root, { typeName }) => {
            const type = await db.template_type.findOne({
                where: {
                    name: Sequelize.where(
                        Sequelize.fn("LOWER", Sequelize.col("name")),
                        "LIKE",
                        "%" + typeName.toLowerCase() + "%"
                    )
                }
            });

            if (Boolean(type)) {
                const { id: templateTypeId } = type;
                return await db.template.findAll({
                    where: {
                        templateTypeId
                    }
                });
            } else {
                return [];
            }
        }
    },
    Template: {
        layouts: async template =>
            db.layout.findAll({
                include: [
                    {
                        model: db.template,
                        where: { id: template.id }
                    }
                ]
            }),
        validations: async template =>
            await db.validation.findAll({
                include: [
                    {
                        model: db.template,
                        where: { id: template.id }
                    }
                ]
            })
    }
};
