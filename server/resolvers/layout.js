import db from "../models";

export default {
    Query: {
        layout: async (_root, { id }) => await db.layout.findByPk(id),
        layouts: async (_root, _input, { user }) => await db.layout.findAll()
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
            await db.layout_family.findByPk(layout.layoutFamilyId)
    }
};
