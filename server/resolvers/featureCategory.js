import db from "../models";

export default {
    Query: {
        featureCategory: async (_root, { id }, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new AuthenticationError("Unauthorized");
            }
            return await db.feature_category.findByPk(id);
        },

        featureCategories: async (_root, _input, { user }) => {
            //if user is not logged in
            if (!user) {
                throw new feature_category("Unauthorized");
            }

            return await db.feature_category.findAll();
        }
    },
    FeatureCategory: {
        features: async fc =>
            await db.feature.findAll({
                where: { featureCategoryId: fc.id }
            })
    }
};
