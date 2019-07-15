import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        department(id: ID!): Department
        departments: [Department]
        departmentsByUser: [Department]
        departmentsByClient(id: ID!): [Department]
    }

    extend type Mutation {
        createDepartment(input: CreateDepartmentInput): Department
        updateDepartment(input: UpdateDepartmentInput): Department
        deleteDepartment(id: ID!, clientId: ID!): Department
        duplicateDepartment(input: DuplicateDepartmentInput): Department
    }

    type Department {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        clients: [Client]
        roles(clientId: ID!): [Role]
        rolesAll: [Role]
    }

    input CreateDepartmentInput {
        name: String!
        clientId: ID!
    }

    input UpdateDepartmentInput {
        id: ID!
        name: String!
    }

    input DuplicateDepartmentInput {
        id: ID!
        name: String!
        clientId: ID!
    }
`;
