import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tier(id: ID!): Tier
        tiers: [Tier]
        tiers_by_system: [Tier]
    }

    type Tier {
        id: ID!
        name: String
        tiers: [Tier]
        systems: [System]
    }
`;
