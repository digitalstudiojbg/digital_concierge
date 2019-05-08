import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        article(id: ID!): Article
        articles: [Article]
        articlesByPublication(id: ID!): [Article]
    }

    type Article {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        just_brilliant_guide: JustBrilliantGuide
        advertisings: [Advertising]
    }
`;
