import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        jbgTemplateType: async (_root, { id }) =>
            await db.jbg_template_type.findByPk(id),
        jbgTemplateTypes: async (_root, _input, { user }) =>
            await db.jbg_template_type.findAll(),
        jbgTemplateTypeFilter: async (_root, { name }) => {
            //Case sensitive searching by name in sequelize
            //https://stackoverflow.com/questions/42352090/sequelize-find-all-that-match-contains-case-insensitive
            const types = await db.jbg_template_type.findAll({
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
    JBGTemplateType: {
        jbg_templates: async jbgTemplateType =>
            await db.jbg_template.findAll({
                include: [
                    {
                        model: db.jbg_template_type,
                        where: { id: jbgTemplateType.id }
                    }
                ]
            })
    }
};
