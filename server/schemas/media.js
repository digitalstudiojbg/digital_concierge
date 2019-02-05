import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        medium(id: ID!): Media
        media: [Media]
        mediaByClient(
            id: ID!
            limit: Int
            offset: Int
            cursor: String
        ): [MediaPagination]
        mediaBySystem(id: ID!): [Media]
    }

    type Media {
        id: ID!
        name: String
        path: URL
        type: String
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        key: String
    }

    type MediaPagination {
        id: ID!
        name: String
        path: URL
        type: String
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        key: String
        totalImages: Int
    }
`;
