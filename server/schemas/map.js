import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        map(id: ID!): Map
        maps: [Map]
    }

    type Map {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        systems: [System]
        layout: Layout
        media: [Media]
    }
`;
