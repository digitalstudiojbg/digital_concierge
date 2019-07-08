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
    }

    type Department {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        clients: [Client]
        roles: [Role]
    }

    input CreateDepartmentInput {
        name: String!
        clientId: ID!
    }
`;
