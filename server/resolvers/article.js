import db from "../models";
import { UserInputError } from "apollo-server-express";
import {
    handleUpdateActionActivityLog,
    processUploadMedia,
    handleCreateActionActivityLog
} from "../utils/constant";

const processArticleImage = async (uploadFile, mediumId, clientId) => {
    let image = null;
    //Check if image update
    if (uploadFile) {
        image = await processUploadMedia(uploadFile, clientId, "image");
    } else if (media_id) {
        //If Image was changed from media library
        image = await db.media.findByPk(mediumId);
    }
    return image;
};

export default {
    Query: {
        article: async (_root, { id }) => await db.article.findByPk(id),
        articles: async (_root, _input, { user }) => await db.article.findAll(),
        articlesByPublication: async (_root, { id }) =>
            await db.article.findAll({
                where: { justBrilliantGuideId: id },
                order: [["order", "ASC"]]
            })
    },
    Mutation: {
        setArticleActiveInactive: async (_root, { id }, { user, clientIp }) => {
            const article = await db.article.findByPk(id);
            if (!article) {
                throw new UserInputError(
                    `Error! Article ID ${id} does not exist`
                );
            }

            try {
                await db.article.update(
                    { active: !article.active },
                    { where: { id } }
                );
            } catch (error) {
                throw new UserInputError(error);
            }

            handleUpdateActionActivityLog(
                article,
                { active: !article.active },
                user,
                clientIp
            );

            return await db.article.findByPk(id);
        },
        moveArticleUp: async (_root, { id, by = 1 }, { user, clientIp }) => {
            if (by < 0) {
                throw new UserInputError(
                    `Error! by should be greater than zero! Current "by" value: ${by}`
                );
            }
            const article = await db.article.findByPk(id);
            if (!article) {
                throw new UserInputError(
                    `Error! Article ID ${id} does not exist`
                );
            }

            const { justBrilliantGuideId, order } = article;

            const articles = await db.article.findAll({
                where: {
                    justBrilliantGuideId,
                    order: { [db.op.lt]: order, [db.op.gte]: order - by }
                },
                order: [["order", "ASC"]]
            });

            // console.log(
            //     "articles: ",
            //     articles.map(({ id, name, order }) => ({ id, name, order }))
            // );

            if (articles.length !== by) {
                throw new UserInputError(
                    `Error! Cannot move article ID ${id} up by ${by} because there is not enough elements!`
                );
            }

            //Change current article
            try {
                await db.article.update(
                    { order: order - by },
                    { where: { id } }
                );
                handleUpdateActionActivityLog(
                    article,
                    { order: order - by },
                    user,
                    clientIp
                );
            } catch (error) {
                throw new UserInputError(
                    `Error! Unable to update order for Article ID ${id}`,
                    error
                );
            }

            //Change other articles (by moving down)
            for await (const uArticle of articles) {
                try {
                    const { id: updateId, order: updateOrder } = uArticle;
                    await db.article.update(
                        { order: updateOrder + 1 },
                        { where: { id: updateId } }
                    );
                    handleUpdateActionActivityLog(
                        uArticle,
                        { order: updateOrder + 1 },
                        user,
                        clientIp
                    );
                } catch (error) {
                    throw new UserInputError(
                        `Error! Unable to update order for Article ID ${updateId}`,
                        error
                    );
                }
            }

            return await db.article.findByPk(id);
        },
        moveArticleDown: async (_root, { id, by = 1 }, { user, clientIp }) => {
            if (by < 0) {
                throw new UserInputError(
                    `Error! by should be greater than zero! Current "by" value: ${by}`
                );
            }
            const article = await db.article.findByPk(id);
            if (!article) {
                throw new UserInputError(
                    `Error! Article ID ${id} does not exist`
                );
            }

            const { justBrilliantGuideId, order } = article;

            const articles = await db.article.findAll({
                where: {
                    justBrilliantGuideId,
                    order: { [db.op.gt]: order, [db.op.lte]: order + by }
                },
                order: [["order", "ASC"]]
            });

            // console.log(
            //     "articles: ",
            //     articles.map(({ id, name, order }) => ({ id, name, order }))
            // );

            if (articles.length !== by) {
                throw new UserInputError(
                    `Error! Cannot move article ID ${id} down by ${by} because there is not enough elements!`
                );
            }

            //Change current article
            try {
                await db.article.update(
                    { order: order + by },
                    { where: { id } }
                );
                handleUpdateActionActivityLog(
                    article,
                    { order: order + by },
                    user,
                    clientIp
                );
            } catch (error) {
                throw new UserInputError(
                    `Error! Unable to update order for Article ID ${id}`,
                    error
                );
            }

            //Change other articles (by moving up)
            for await (const uArticle of articles) {
                try {
                    const { id: updateId, order: updateOrder } = uArticle;
                    await db.article.update(
                        { order: updateOrder - 1 },
                        { where: { id: updateId } }
                    );
                    handleUpdateActionActivityLog(
                        uArticle,
                        { order: updateOrder - 1 },
                        user,
                        clientIp
                    );
                } catch (error) {
                    throw new UserInputError(
                        `Error! Unable to update order for Article ID ${updateId}`,
                        error
                    );
                }
            }

            return await db.article.findByPk(id);
        },
        createArticle: async (
            _root,
            {
                input: {
                    name,
                    description,
                    introductionText,
                    justBrilliantGuideId,
                    header_image_upload,
                    headerMediumId,
                    feature_image_upload,
                    featureMediumId,
                    jbgTemplateId,
                    jbgLayoutId,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            const headerImage = await processArticleImage(
                header_image_upload,
                headerMediumId,
                clientId
            );
            const featureImage = await processArticleImage(
                feature_image_upload,
                featureMediumId,
                clientId
            );

            const tempArticle = {
                name,
                ...(Boolean(description) && { description }),
                ...(Boolean(introductionText) && { introductionText }),
                justBrilliantGuideId,
                jbgTemplateId,
                jbgLayoutId,
                ...(Boolean(headerImage) &&
                    Boolean(headerImage.id) && {
                        headerMediumId: headerImage.id
                    }),
                ...(Boolean(featureImage) &&
                    Boolean(featureImage.id) && {
                        featureMediumId: featureImage.id
                    })
            };

            let created_article = db.article.build({ ...tempArticle });
            try {
                await created_article.save();
            } catch (error) {
                throw new UserInputError(
                    `Create Article ${name} failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            handleCreateActionActivityLog(
                created_article,
                tempArticle,
                user,
                clientIp
            );

            return created_article;
        },
        editArticle: async (
            _root,
            {
                input: {
                    id,
                    name,
                    description,
                    introductionText,
                    header_image_upload,
                    headerMediumId,
                    feature_image_upload,
                    featureMediumId,
                    jbgTemplateId,
                    jbgLayoutId,
                    clientId
                }
            },
            { user, clientIp }
        ) => {
            const article = await db.article.findByPk(id);
            if (!article) {
                throw new UserInputError(
                    `Error! Article ID ${id} does not exist`
                );
            }

            const headerImage = await processArticleImage(
                header_image_upload,
                headerMediumId,
                clientId
            );
            const featureImage = await processArticleImage(
                feature_image_upload,
                featureMediumId,
                clientId
            );

            const tempArticle = {
                name,
                ...(Boolean(description) && { description }),
                ...(Boolean(introductionText) && { introductionText }),
                jbgTemplateId,
                jbgLayoutId,
                ...(Boolean(headerImage) &&
                    Boolean(headerImage.id) && {
                        headerMediumId: headerImage.id
                    }),
                ...(Boolean(featureImage) &&
                    Boolean(featureImage.id) && {
                        featureMediumId: featureImage.id
                    })
            };

            try {
                await db.article.update({ ...tempArticle }, { where: { id } });
            } catch (error) {
                throw new UserInputError(
                    `Update Article ID: ${id} with Article name: ${name} failed.\nError Message: ${
                        error.message
                    }`
                );
            }

            handleUpdateActionActivityLog(article, tempArticle, user, clientIp);

            return await db.article.findByPk(id);
        }
    },
    Article: {
        just_brilliant_guide: async article =>
            await db.just_brilliant_guide.findByPk(
                article.justBrilliantGuideId
            ),
        advertisings: async article =>
            await db.advertising.findAll({
                include: [
                    {
                        model: db.article,
                        where: { id: article.id }
                    }
                ]
            }),
        header_image: async article =>
            await db.media.findByPk(article.headerMediumId),
        feature_image: async article =>
            await db.media.findByPk(article.featureMediumId),
        jbg_template: async article =>
            await db.jbg_template.findByPk(article.jbgTemplateId),
        jbg_layout: async article =>
            await db.jbg_layout.findByPk(article.jbgLayoutId)
    }
};
