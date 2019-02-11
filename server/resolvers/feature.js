import db from "../models";

export default {
    Query: {
        feature: async (_root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.feature.findByPk(id);
        },

        features: async (_root, _input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new feature_category("Unauthorized");
            }

            return await db.feature.findAll();
        }
    },
    Feature: {
        feature_category: async feature =>
            await db.feature_category.findByPk(feature.featureCategoryId),
        systems: async feature =>
            await db.system.findAll({
                include: [
                    {
                        model: db.feature,
                        where: { id: feature.id }
                    }
                ]
            })
    }
};
