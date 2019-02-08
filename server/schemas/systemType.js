import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        systemType(id: ID!): SystemType
        systemTypes: [SystemType]
    }

    type SystemType {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        systems: [System]
    }
`;
