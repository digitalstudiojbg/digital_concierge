import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        layoutFamily(id: ID!): LayoutFamily
        layoutFamilies: [LayoutFamily]
        layoutFamilyFilter(name: String!): LayoutFamily
    }

    type LayoutFamily {
        id: ID!
        name: String
        layouts: [Layout]
        layoutsByType(typeName: String!): [Layout]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
