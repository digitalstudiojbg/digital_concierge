import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        layoutType(id: ID!): LayoutType
        layoutTypes: [LayoutType]
        layoutTypeFilter(name: String!): LayoutType
    }

    type LayoutType {
        id: ID!
        name: String
        layouts: [Layout]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
