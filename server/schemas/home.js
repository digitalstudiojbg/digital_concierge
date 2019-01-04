import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        home(id: ID!): Home
        homes: [Home]
    }

    type Home {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        layout: Layout
        systems: [System]
        media: [Media]
    }
`;
