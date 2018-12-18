import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tier_layout(id: ID!): Tier_Layout
        tier_layouts: [Tier_Layout]
    }

    type Tier_Layout {
        id: ID!
        name: String
        validations: [Validation]
        tiers: [Tier]
    }
`;
