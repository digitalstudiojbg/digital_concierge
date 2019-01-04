import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        group(id: ID!): Group
        groups: [Group]
    }
    type Group {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        roles: [Role]
    }
`;
