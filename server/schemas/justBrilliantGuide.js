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
        jbgWelcome: JbgWelcome
        systems: [System]
        jbgMaps: [JbgMap]
        jbgDirectoryLists: [JbgDirectoryList]
    }
`;
