import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        artworkSize(id: ID!): ArtworkSize
        artworkSizes: [ArtworkSize]
    }

    type ArtworkSize {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        advertisings: [Advertising]
    }
`;
