import { gql } from "apollo-server-express";

export default gql`
    extend type Media {
        medium(id: ID!): Media
        media: [Media]
        mediaByClient(id: ID!): [Media]
        mediaBySystem(id: ID!): [Media]
    }

    type Media {
        id: ID!
        name: String
        path: String
        type: String
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
