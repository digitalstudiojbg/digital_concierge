import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        directoryEntry(id: ID!): DirectoryEntry
        directoryEntries: [DirectoryEntry]
    }

    type DirectoryEntry {
        id: ID!
        name: String
        title: String
        createdAt: DateTime
        updatedAt: DateTime
        directoryLists: [DirectoryList]
        layout: Layout
        media: [Media]
    }
`;
