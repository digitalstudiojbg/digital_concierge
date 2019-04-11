import db from "../models";
import {
    processColours,
    handleCreateActionActivityLog
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        palette: async (_root, { id }) => await db.palette.findByPk(id),
        palettes: async () => await db.palette.findAll(),
        palettesByClient: async (_root, { id }) =>
            await db.palette.findAll({ where: { clientId: id } })
    },
    Mutation: {
        createPalette: async (
            _root,
            { input: { name, colours, clientId } },
            { user, clientIp }
        ) => {
            //Process colours
            const {
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
            } = processColours(colours);

            let created_palette = db.palette.build({
                name,
                colour1Hex,
                colour1Alpha,
                colour2Hex,
                colour2Alpha,
                colour3Hex,
                colour3Alpha,
                colour4Hex,
                colour4Alpha,
                colour5Hex,
                colour5Alpha,
                clientId
            });

            try {
                await created_palette.save();
            } catch (e) {
                throw new UserInputError(e);
            }

            //Do logging here
            handleCreateActionActivityLog(
                created_palette,
                {
                    name,
                    colour1Hex,
                    colour1Alpha,
                    colour2Hex,
                    colour2Alpha,
                    colour3Hex,
                    colour3Alpha,
                    colour4Hex,
                    colour4Alpha,
                    colour5Hex,
                    colour5Alpha,
                    clientId
                },
                user,
                clientIp
            );

            return created_palette;
        }
    },
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
