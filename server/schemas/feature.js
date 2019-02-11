import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        feature(id: ID!): Feature
        features: [Feature]
    }

    type Feature {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        feature_category: FeatureCategory
        systems: [System]
    }
`;
