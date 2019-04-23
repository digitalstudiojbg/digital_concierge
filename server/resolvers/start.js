import db from "../models";

export default {
    Query: {
        start: async (_root, { id }) => {
            return await db.start.findByPk(id);
        },
        starts: async (_root, _input, { user }) => {
            return await db.start.findAll();
        }
    },
    Start: {
        layout: async start => await db.layout.findByPk(start.layoutId),
        systems: async start =>
            await db.system.findAll({
                include: [
                    {
                        model: db.start,
                        where: { id: start.id }
                    }
                ]
            }),
        media: async start =>
            await db.media.findAll({
                include: [
                    {
                        model: db.start,
                        as: "startMedia",
                        where: { id: start.id }
                    }
                ]
            }),
        template: async start => await db.template.findByPk(start.templateId),
        colours: ({
            colour1Hex,
            colour1Alpha,
            colour2Hex,
            colour2Alpha,
            colour3Hex,
            colour3Alpha,
            colour4Hex,
            colour4Alpha,
            colour5Hex,
            colour5Alpha
        }) => [
            { hex: colour1Hex, alpha: colour1Alpha },
            { hex: colour2Hex, alpha: colour2Alpha },
            { hex: colour3Hex, alpha: colour3Alpha },
            { hex: colour4Hex, alpha: colour4Alpha },
            { hex: colour5Hex, alpha: colour5Alpha }
        ],
        logo: async start => await db.media.findByPk(start.logoMediaId),
        header: async start => await db.media.findByPk(start.headerMediaId)
    }
};
