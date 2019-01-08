import db from "../models";

export default {
    Query: {
        template: async (_root, { id }) => {
            return await db.template.findByPk(id);
        },
        templates: async (_root, _input, { user }) => {
            return await db.template.findAll();
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
