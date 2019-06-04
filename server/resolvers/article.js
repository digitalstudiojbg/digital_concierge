import db from "../models";

export default {
    Query: {
        article: async (_root, { id }) => await db.article.findByPk(id),
        articles: async (_root, _input, { user }) => await db.article.findAll()
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
            })
    }
};
