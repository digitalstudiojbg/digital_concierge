import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        directoryList(id: ID!): DirectoryList
        directoryLists: [DirectoryList]
        directoryLists_by_system(id: ID!): [DirectoryList]
    }

    extend type Mutation {
        createDirectoryList(input: CreateDirectoryListInput): DirectoryList
        editDirectoryList(input: UpdateDirectoryListInput): DirectoryList
        deleteDirectoryList(id: ID!): DirectoryList
    }

    type DirectoryList {
        id: ID!
        name: String
        is_root: Boolean
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        child_directory_lists: [DirectoryList]
        system: System
        layout: Layout
        directory_entries: [DirectoryEntry]
        media: [Media]
    }

    input CreateDirectoryListInput {
        name: String!
        is_root: Boolean!
        parent_id: Int
        layout_id: Int!
        system_id: Int!
        image: Upload
    }

    input UpdateDirectoryListInput {
        id: ID!
        name: String!
        is_root: Boolean!
        parent_id: Int
        layout_id: Int!
        system_id: Int!
        image: Upload
    }
`;
