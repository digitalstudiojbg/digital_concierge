import db from "../models";

export default {
    Query: {
        article: async (_root, { id }) => await db.article.findByPk(id),
        articles: async (_root, _input, { user }) => await db.article.findAll(),
        articlesByPublication: async (_root, { id }) =>
            await db.article.findAll({ where: { justBrilliantGuideId: id } })
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
