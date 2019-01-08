import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgDirectoryList(id: ID!): JbgDirectoryList
        jbgDirectoryLists: [JbgDirectoryList]
        jbgDirectoryLists_by_justBrilliantGuide(id: ID!): [JbgDirectoryList]
    }

    type JbgDirectoryList {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        just_brillant_guides: [JustBrilliantGuide]
        systems: [System]
        layout: Layout
        child_category: [JbgDirectoryList]
        tb_directories: [JbgDirectoryEntry]
        media: [Media]
    }
`;
