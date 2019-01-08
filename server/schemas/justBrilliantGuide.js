import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        justBrilliantGuide(id: ID!): JustBrilliantGuide
        justBrilliantGuides: [JustBrilliantGuide]
    }

    type JustBrilliantGuide {
        id: ID!
        name: String
        location: String
        createdAt: DateTime
        updatedAt: DateTime
        jbg_welcome: JbgWelcome
        systems: [System]
        jbg_maps: [JbgMap]
        jbg_directory_lists: [JbgDirectoryList]
    }
`;
