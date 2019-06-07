import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        article(id: ID!): Article
        articles: [Article]
        articlesByPublication(id: ID!): [Article]
    }

    extend type Mutation {
        setArticleActiveInactive(id: ID!): Article
        moveArticleUp(id: ID!, by: Int): Article
        moveArticleDown(id: ID!, by: Int): Article
    }

    type Article {
        id: ID!
        name: String
        order: Int
        description: String
        introductionText: String
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        just_brilliant_guide: JustBrilliantGuide
        advertisings: [Advertising]
        header_image: Media
        feature_image: Media
        jbg_template: JBGTemplate
        jbg_layout: JBGLayout
    }
`;
