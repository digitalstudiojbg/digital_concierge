import db from "../models";

export default {
    Query: {
        layout: async (_root, { id }) => {
            const layout = await db.layout.findByPk(id);
            //Get model and table name in v4: https://stackoverflow.com/a/47918030
            console.log("model name ", layout.constructor.name);
            console.log("table name ", layout.constructor.getTableName());
            return layout;
        },
        layouts: async (_root, _input, { user }) => {
            return await db.layout.findAll();
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
        media: async layout => await db.media.findByPk(layout.mediumId)
    }
};
