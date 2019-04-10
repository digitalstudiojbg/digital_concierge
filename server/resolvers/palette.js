import db from "../models";

export default {
    Query: {
        palette: async (_root, { id }) => await db.palette.findByPk(id),
        palettes: async () => await db.palette.findAll(),
        palettesByClient: async (_root, { id }) =>
            await db.palette.findAll({ where: { clientId: id } })
    },
    // Mutation: {},
    Palette: {
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
        client: async ({ clientId }) => {
            return await db.client.findByPk(clientId);
        }
    }
};
