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
        deleteDirectoryListEntry(
            directoryEntryIdList: [Dir_Entry_And_List_Change_Status_Request]
            directoryListIdList: [Int]
            systemId: Int
        ): Dir_Entry_And_List_Delete_Response
    }

    type DirectoryList {
        id: ID!
        name: String
        title: String
        description: String
        order: Int
        is_root: Boolean
        active: Boolean
        colours: [JSON]
        colour1Hex: String
        colour1Alpha: Int
        colour2Hex: String
        colour2Alpha: Int
        colour3Hex: String
        colour3Alpha: Int
        colour4Hex: String
        colour4Alpha: Int
        colour5Hex: String
        colour5Alpha: Int
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
        colours: [ColourThemeInput]!
    }

    input UpdateDirectoryListInput {
        id: ID!
        name: String!
        is_root: Boolean!
        parent_id: Int
        layout_id: Int!
        system_id: Int!
        image: Upload
        media_id: Int
        colours: [ColourThemeInput]
    }

    type Dir_Entry_And_List_Delete_Response {
        result: Boolean
    }
`;
