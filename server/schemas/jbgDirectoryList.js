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
        title: String
        description: String
        order: Int
        createdAt: DateTime
        updatedAt: DateTime
        just_brilliant_guides: [JustBrilliantGuide]
        systems: [System]
        layout: Layout
        child_jbg_directory_lists: [JbgDirectoryList]
        jbg_directory_entries: [JbgDirectoryEntry]
        media: [Media]
    }
`;
