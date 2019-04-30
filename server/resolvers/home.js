import db from "../models";

export default {
    Query: {
        home: async (_root, { id }) => {
            return await db.home.findByPk(id);
        },
        homes: async (_root, _input, { user }) => {
            return await db.home.findAll();
        }
    },
    Mutation: {
        createHome: async (
            _root,
            {
                input: {
                    description,
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

            let home = db.home.build({
                ...(description && { description }),
                logoMediaId: logo_media.id,
                headerMediaId: header_media.id,
                ...processColours(colours),
                layoutId,
                ...(templateId && { templateId })
            });

            try {
                await home.save();
            } catch (e) {
                throw new UserInputError(e);
            }

            //Assign system ID the created home
            const system = db.system.findByPk(systemId);

            if (!system) {
                throw new UserInputError(
                    `Unable to find system ID: ${systemId}`
                );
            }

            home = await db.home.findByPk(home.id);

            try {
                await db.system.update(
                    {
                        homeId: home.id
                    },
                    { where: { id: systemId } }
                );
            } catch (e) {
                throw new UserInputError(
                    `Unable to set home ID ${
                        home.id
                    } to system ID ${systemId}: `,
                    e
                );
            }

            handleCreateActionActivityLog(
                home,
                {
                    ...(description && { description }),
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

            return home;
        },
        editHome: async (
            _root,
            {
                input: {
                    id,
                    description,
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
            let home = await db.home.findByPk(id);
            if (!home) {
                throw new UserInputError(`Invalid Home ID`);
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
                await db.home.update(
                    {
                        ...(description && { description }),
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
                home,
                {
                    ...(description && { description }),
                    ...(logo_media && { logoMediaId: logo_media.id }),
                    ...(header_media && { headerMediaId: header_media.id }),
                    ...processColours(colours),
                    layoutId,
                    ...(templateId && { templateId })
                },
                user,
                clientIp
            );

            return home;
        }
    },
    Home: {
        layout: async home => {
            return await db.layout.findByPk(home.layoutId);
        },
        systems: async home => {
            return await db.system.findAll({
                include: [
                    {
                        model: db.gallery,
                        where: { id: home.id }
                    }
                ]
            });
        },
        media: async home => {
            return await db.media.findAll({
                include: [
                    {
                        model: db.gallery,
                        where: { id: home.id }
                    }
                ]
            });
        },
        template: async home => await db.template.findByPk(home.templateId),
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
        logo: async home => await db.media.findByPk(home.logoMediaId),
        header: async home => await db.media.findByPk(home.headerMediaId)
    }
};
