import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        justBrilliantGuide(id: ID!): JustBrilliantGuide
        justBrilliantGuides: [JustBrilliantGuide]
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
    }
`;
