import db from "../models";
import { UserInputError } from "apollo-server-express";
import { handleUpdateActionActivityLog } from "../utils/constant";

export default {
    Query: {
        article: async (_root, { id }) => await db.article.findByPk(id),
        articles: async (_root, _input, { user }) => await db.article.findAll(),
        articlesByPublication: async (_root, { id }) =>
            await db.article.findAll({ where: { justBrilliantGuideId: id } })
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
