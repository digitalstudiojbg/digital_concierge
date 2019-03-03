import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        layoutFamily(id: ID!): LayoutFamily
        layoutFamilies: [LayoutFamily]
    }

    type LayoutFamily {
        id: ID!
        name: String
        layouts: [Layout]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
