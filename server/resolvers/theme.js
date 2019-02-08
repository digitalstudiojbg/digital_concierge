import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    asyncForEach,
    processUpload,
    handleCreateActionActivityLog
} from "../utils/constant";

const processColours = colours => {
    //Check that there are 5 colours that were sent
    if (colours.length !== 5) {
        throw new UserInputError("Theme Colours Array must have a size of 5!");
    }

    const [
        { hex: colour1Hex, alpha: colour1Alpha },
        { hex: colour2Hex, alpha: colour2Alpha },
        { hex: colour3Hex, alpha: colour3Alpha },
        { hex: colour4Hex, alpha: colour4Alpha },
        { hex: colour5Hex, alpha: colour5Alpha }
    ] = colours;

    return {
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
    };
};

export default {
    Query: {
        theme: async (_root, { id }) => await db.theme.findByPk(id),
        themes: async () => await db.theme.findAll()
    },
    Mutation: {
        createThemes: async (_root, { input: themes }, { user, clientIp }) => {
            let outputs = [];
            await asyncForEach(themes, async eachTheme => {
                const {
                    companyLogo,
                    headerFont,
                    subHeaderFont,
                    bodyFont,
                    captionFont,
                    colours,
                    defaultStartLayoutId,
                    defaultHomeLayoutId,
                    defaultDirListLayoutId,
                    defaultDirEntryLayoutId
                } = eachTheme;

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

                //Check if layouts selected exists
                let checker = await db.layout.findByPk(defaultStartLayoutId);
                if (!Boolean(checker)) {
                    throw new UserInputError(
                        `Default Start Layout ID ${defaultStartLayoutId} is not found!`
                    );
                }
                checker = await db.layout.findByPk(defaultHomeLayoutId);
                if (!Boolean(checker)) {
                    throw new UserInputError(
                        `Default Home Layout ${defaultHomeLayoutId} is not found!`
                    );
                }
                checker = await db.layout.findByPk(defaultDirListLayoutId);
                if (!Boolean(checker)) {
                    throw new UserInputError(
                        `Default Directory List Layout ID ${defaultDirListLayoutId} is not found!`
                    );
                }
                checker = await db.layout.findByPk(defaultDirEntryLayoutId);
                if (!Boolean(checker)) {
                    throw new UserInputError(
                        `Default Directory Entry Layout ID ${defaultDirEntryLayoutId} is not found!`
                    );
                }

                //Try to upload image
                uploadedCompanyLogo = await processUpload(companyLogo);

                const theme = db.theme.build({
                    companyLogo: uploadedCompanyLogo.location,
                    headerFont,
                    subHeaderFont,
                    bodyFont,
                    captionFont,
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
                    defaultStartLayoutId,
                    defaultHomeLayoutId,
                    defaultDirListLayoutId,
                    defaultDirEntryLayoutId
                });

                try {
                    theme.save();
                } catch (error) {
                    //Delete image if theme creation fails
                    processDelete(uploadedCompanyLogo.key);

                    throw new UserInputError(
                        `Create Theme status failed.\nError Message: ${
                            error.message
                        }`
                    );
                }

                //Activity Logging
                await handleCreateActionActivityLog(
                    theme,
                    {
                        companyLogo: uploadedCompanyLogo.location,
                        headerFont,
                        subHeaderFont,
                        bodyFont,
                        captionFont,
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
                        defaultStartLayoutId,
                        defaultHomeLayoutId,
                        defaultDirListLayoutId,
                        defaultDirEntryLayoutId
                    },
                    user,
                    clientIp
                );

                outputs.push(theme);
            });

            return outputs;
        }
    },
    Theme: {
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
        defaultStartLayout: async ({ defaultStartLayoutId }) =>
            await db.layout.findByPk(defaultStartLayoutId),
        defaultHomeLayout: async ({ defaultHomeLayoutId }) =>
            await db.layout.findByPk(defaultHomeLayoutId),
        defaultDirListLayout: async ({ defaultDirListLayoutId }) =>
            await db.layout.findByPk(defaultDirListLayoutId),
        defaultDirEntryLayout: async ({ defaultDirEntryLayoutId }) =>
            await db.layout.findByPk(defaultDirEntryLayoutId),
        system: async ({ systemId }) => await db.system.findByPk(systemId)
    }
};
