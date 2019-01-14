import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        directoryList(id: ID!): DirectoryList
        directoryLists: [DirectoryList]
        directoryLists_by_system(id: ID!): [DirectoryList]
    }

    type DirectoryList {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        child_directory_lists: [DirectoryList]
        systems: [System]
        layout: Layout
        directory_entries: [DirectoryEntry]
        media: [Media]
    }
`;
