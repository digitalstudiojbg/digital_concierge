import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        start(id: ID!): Start
        starts: [Start]
    }

    type Start {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        layout: Layout
        systems: [System]
        media: [Media]
    }
`;
