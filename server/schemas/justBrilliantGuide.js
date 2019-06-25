import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        justBrilliantGuide(id: ID!): JustBrilliantGuide
        justBrilliantGuides: [JustBrilliantGuide]
        justBrilliantGuideFromAdvertiser(id: ID!): JustBrilliantGuide
    }

    extend type Mutation {
        createJustBrilliantGuide(
            input: CreateJustBrilliantGuideInput
        ): JustBrilliantGuide
        editJustBrilliantGuide(
            input: UpdateJustBrilliantGuideInput
        ): JustBrilliantGuide
        duplicateJustBrilliantGuide(id: ID!): JustBrilliantGuide
    }

    type JustBrilliantGuide {
        id: ID!
        name: String
        welcomeFamilyId: Int
        welcomeFamily: JBGLayoutFamily
        featureFamilyId: Int
        featureFamily: JBGLayoutFamily
        informationFamilyId: Int
        informationFamily: JBGLayoutFamily
        mapFamilyId: Int
        mapFamily: JBGLayoutFamily
        galleryFamilyId: Int
        galleryFamily: JBGLayoutFamily
        marketFamilyId: Int
        marketFamily: JBGLayoutFamily
        foodFamilyId: Int
        foodFamily: JBGLayoutFamily
        attractionFamilyId: Int
        attractionFamily: JBGLayoutFamily
        eventFamilyId: Int
        eventFamily: JBGLayoutFamily
        essentialFamilyId: Int
        essentialFamily: JBGLayoutFamily
        createdAt: DateTime
        updatedAt: DateTime
        jbg_welcome: JbgWelcome
        systems: [System]
        jbg_maps: [JbgMap]
        jbg_directory_lists: [JbgDirectoryList]
        media: [Media]
        articles: [Article]
    }

    input CreateJustBrilliantGuideInput {
        name: String!
        welcomeFamilyId: Int!
        featureFamilyId: Int!
        informationFamilyId: Int!
        mapFamilyId: Int!
        galleryFamilyId: Int!
        marketFamilyId: Int!
        foodFamilyId: Int!
        attractionFamilyId: Int!
        eventFamilyId: Int!
        essentialFamilyId: Int!
        image: Upload!
    }

    input UpdateJustBrilliantGuideInput {
        id: ID!
        name: String!
        welcomeFamilyId: Int!
        featureFamilyId: Int!
        informationFamilyId: Int!
        mapFamilyId: Int!
        galleryFamilyId: Int!
        marketFamilyId: Int!
        foodFamilyId: Int!
        attractionFamilyId: Int!
        eventFamilyId: Int!
        essentialFamilyId: Int!
        image: Upload
    }
`;
