import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        department(id: ID!): Department
        departments: [Department]
    }
    type Department {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        clients: [Client]
        roles: [Role]
    }
`;
