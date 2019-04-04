import db from "../models";
const Sequelize = require("sequelize");

export default {
    Query: {
        templateType: async (_root, { id }) =>
            await db.template_type.findByPk(id),
        templateTypes: async (_root, _input, { user }) =>
            await db.template_type.findAll(),
        templateTypeFilter: async (_root, { name }) => {
            //Case sensitive searching by name in sequelize
            //https://stackoverflow.com/questions/42352090/sequelize-find-all-that-match-contains-case-insensitive
            const types = await db.template_type.findAll({
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
    TemplateType: {
        templates: async templateType =>
            await db.template.findAll({
                include: [
                    {
                        model: db.template_type,
                        where: { id: templateType.id }
                    }
                ]
            })
    }
};
