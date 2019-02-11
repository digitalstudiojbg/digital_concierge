import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        featureCategory(id: ID!): FeatureCategory
        featureCategories: [FeatureCategory]
    }

    type FeatureCategory {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        features: [Feature]
    }
`;
