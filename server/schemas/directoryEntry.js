import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        directoryEntry(id: ID!): DirectoryEntry
        directoryEntries: [DirectoryEntry]
    }

    extend type Mutation {
        changeDirectoryListAndEntryStatus(
            directoryEntryIdList: [Dir_Entry_And_List_Change_Status_Request]
            directoryListIdList: [Int]
            status: Boolean
            systemId: Int
        ): Dir_Entry_And_List_Response
    }

    type DirectoryEntry {
        id: ID!
        name: String
        title: String
        description: String
        order: Int
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
        directoryLists: [DirectoryList]
        layout: Layout
        media: [Media]
    }

    input Dir_Entry_And_List_Change_Status_Request {
        directoryEntryId: Int
        directoryListId: Int
    }

    type Dir_Entry_And_List_Response {
        result: Boolean
    }
`;
