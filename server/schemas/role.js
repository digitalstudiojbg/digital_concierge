import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        role(id: ID!): Role
        roles: [Role]
        rolesByClientId(clientId: ID!): [Role]
    }

    extend type Mutation {
        createRole(input: CreateRoleInput): Role
        updateRole(input: UpdateRoleInput): Role
    }

    type Role {
        id: ID!
        name: String
        is_standard_role: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        users: [User]
        permissions: [Permission]
        department: Department
    }

    input CreateRoleInput {
        name: String!
        isStandardRole: Boolean!
        departmentId: Int!
        permissionIds: [Int]!
    }

    input UpdateRoleInput {
        id: Int!
        name: String!
        departmentId: Int!
        permissionIds: [Int]!
    }
`;
