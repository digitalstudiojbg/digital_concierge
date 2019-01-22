import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        role(id: ID!): Role
        roles: [Role]
    }

    type Role {
        id: ID!
        name: String
        is_standard_role: Boolean
        users: [User]
        permissions: [Permission]
        department: Department
    }
`;
