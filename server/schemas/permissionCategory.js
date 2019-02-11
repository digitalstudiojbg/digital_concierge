import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        permissionCategory(id: ID!): PermissionCategory
        permissionCategories: [PermissionCategory]
    }

    type PermissionCategory {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        permissions: [Permission]
    }
`;
