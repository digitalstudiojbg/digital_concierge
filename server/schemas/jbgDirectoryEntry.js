import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgDirectoryEntry(id: ID!): JbgDirectoryEntry
        jbgDirectoryEntries: [JbgDirectoryEntry]
    }

    type JbgDirectoryEntry {
        id: ID!
        name: String
        title: String
        description: String
        order: Int
        createdAt: DateTime
        updatedAt: DateTime
        jbgDirectoryLists: [JbgDirectoryList]
        layout: Layout
        media: [Media]
    }
`;
