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
        child_category: [DirectoryList]
        systems: [System]
        layout: Layout
        tb_directories: [DirectoryEntry]
        media: [Media]
    }
`;
