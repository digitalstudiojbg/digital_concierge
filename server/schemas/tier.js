import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tier(id: ID!): Tier
        tiers: [Tier]
        tiers_by_system(id: ID!): [Tier]
    }

    type Tier {
        id: ID!
        name: String
        child_tiers: [Tier]
        child_category: [Tier]
        systems: [System]
        content_layout: Content_Layout
        directories: [Directory]
        directories_active: [Directory]
        media: [Media]
    }
`;
