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
        createArticle(input: CreateArticleInput): Article
        editArticle(input: UpdateArticleInput): Article
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
        justBrilliantGuideId: Int
        advertisings: [Advertising]
        header_image: Media
        feature_image: Media
        jbg_template: JBGTemplate
        jbg_layout: JBGLayout
    }

    input CreateArticleInput {
        name: String!
        description: String
        introductionText: String
        justBrilliantGuideId: ID!
        header_image_upload: Upload
        headerMediumId: ID!
        feature_image_upload: Upload
        featureMediumId: ID!
        jbgTemplateId: ID!
        jbgLayoutId: ID!
    }

    input UpdateArticleInput {
        id: ID!
        name: String!
        description: String
        introductionText: String
        justBrilliantGuideId: ID!
        header_image_upload: Upload
        headerMediumId: ID!
        feature_image_upload: Upload
        featureMediumId: ID!
        jbgTemplateId: ID!
        jbgLayoutId: ID!
    }
`;
