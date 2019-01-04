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
        child_category: [JbgDirectoryList]
        systems: [System]
        layout: Layout
        tb_directories: [JbgDirectoryEntry]
        media: [Media]
    }
`;
