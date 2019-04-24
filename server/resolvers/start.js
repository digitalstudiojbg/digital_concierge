import db from "../models";
import {
    processUploadMedia,
    processColours,
    handleCreateActionActivityLog,
    handleUpdateActionActivityLog
} from "../utils/constant";
import { UserInputError } from "apollo-server-express";

export default {
    Query: {
        start: async (_root, { id }) => {
            const start = await db.start.findByPk(id);
            console.log(Object.keys(start.__proto__));
            return start;
        },
        starts: async (_root, _input, { user }) => {
            return await db.start.findAll();
        }
    },
    Mutation: {
        createStart: async (
            _root,
            {
                input: {
                    description,
                    button_text,
                    logo,
                    logoMediaId,
                    header,
                    headerMediaId,
                    colours,
                    layoutId,
                    templateId,
                    clientId,
                    systemId
                }
            },
            { user, clientIp }
        ) => {
            //Handle upload logo file here
            let logo_media = null;
            if (Boolean(logo) && !Boolean(logoMediaId)) {
                logo_media = await processUploadMedia(logo, clientId, "image");
            } else if (logoMediaId) {
                logo_media = await db.media.findByPk(logoMediaId);
            }
            if (!logo_media) {
                throw new UserInputError(`Invalid logo image`);
            }

            //Handle upload header file here
            let header_media = null;
            if (Boolean(header) && !Boolean(headerMediaId)) {
                header_media = await processUploadMedia(
                    header,
                    clientId,
                    "image"
                );
            } else if (headerMediaId) {
                header_media = await db.media.findByPk(headerMediaId);
            }
            if (!header_media) {
                throw new UserInputError(`Invalid header image`);
            }

            let start = db.start.build({
                ...(description && { description }),
                ...(button_text && { button_text }),
                logoMediaId: logo_media.id,
                headerMediaId: header_media.id,
                ...processColours(colours),
                layoutId,
                ...(templateId && { templateId })
            });

            try {
                await start.save();
            } catch (e) {
                throw new UserInputError(e);
            }

            //Assign system ID the created start
            const system = db.system.findByPk(systemId);

            if (!system) {
                throw new UserInputError(
                    `Unable to find system ID: ${systemId}`
                );
            }

            start = await db.start.findByPk(start.id);

            try {
                await db.system.update(
                    {
                        startId: start.id
                    },
                    { where: { id: systemId } }
                );
            } catch (e) {
                throw new UserInputError(
                    `Unable to set start ID ${
                        start.id
                    } to system ID ${systemId}: `,
                    e
                );
            }

            handleCreateActionActivityLog(
                start,
                {
                    ...(description && { description }),
                    ...(button_text && { button_text }),
                    logoMediaId: logo_media.id,
                    headerMediaId: header_media.id,
                    ...processColours(colours),
                    layoutId,
                    templateId,
                    systemId
                },
                user,
                clientIp
            );

            return start;
        },
        editStart: async (
            _root,
            {
                input: {
                    id,
                    description,
                    button_text,
                    logo,
                    logoMediaId,
                    header,
                    headerMediaId,
                    colours,
                    layoutId,
                    templateId,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            let start = await db.start.findByPk(id);
            if (!start) {
                throw new UserInputError(`Invalid Start ID`);
            }

            //Handle upload logo file here
            let logo_media,
                header_media = null;
            if (Boolean(logo) && !Boolean(logoMediaId)) {
                logo_media = await processUploadMedia(logo, clientId, "image");
            } else if (logoMediaId) {
                logo_media = await db.media.findByPk(logoMediaId);
            }

            //Handle upload header file here
            if (Boolean(header) && !Boolean(headerMediaId)) {
                header_media = await processUploadMedia(
                    header,
                    clientId,
                    "image"
                );
            } else if (headerMediaId) {
                header_media = await db.media.findByPk(headerMediaId);
            }

            try {
                await db.start.update(
                    {
                        ...(description && { description }),
                        ...(button_text && { button_text }),
                        ...(logo_media && { logoMediaId: logo_media.id }),
                        ...(header_media && { headerMediaId: header_media.id }),
                        ...processColours(colours),
                        layoutId,
                        ...(templateId && { templateId })
                    },
                    { where: { id } }
                );
            } catch (e) {
                throw new UserInputError(e);
            }

            handleUpdateActionActivityLog(
                start,
                {
                    ...(description && { description }),
                    ...(button_text && { button_text }),
                    ...(logo_media && { logoMediaId: logo_media.id }),
                    ...(header_media && { headerMediaId: header_media.id }),
                    ...processColours(colours),
                    layoutId,
                    ...(templateId && { templateId })
                },
                user,
                clientIp
            );

            return start;
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
