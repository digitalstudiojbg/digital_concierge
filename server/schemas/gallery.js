import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        gallery(id: ID!): Gallery
        galleries: [Gallery]
    }

    type Gallery {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        systems: [System]
        layout: Layout
        media: [Media]
    }
`;
