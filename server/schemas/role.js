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
        deleteRoles(input: DeleteRoleInput): Boolean
        duplicateRoles(input: DuplicateRoleInput): Boolean
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
        client: Client
    }

    input CreateRoleInput {
        name: String!
        isStandardRole: Boolean!
        departmentId: ID!
        permissionIds: [ID]
        clientId: ID!
    }

    input UpdateRoleInput {
        id: Int!
        name: String!
        departmentId: Int!
        permissionIds: [Int]!
    }

    input DeleteRoleInput {
        roleIds: [Int]!
        clientId: Int!
    }

    input DuplicateRoleInput {
        roleIds: [Int]!
    }
`;
