import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        permission(id: ID!): Permission
        permissions: [Permission]
    }

    type Permission {
        id: ID!
        name: String
        roles: [Role]
    }
`;
