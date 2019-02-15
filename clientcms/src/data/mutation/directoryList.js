import gql from "graphql-tag";

export const CREATE_DIRECTORY_LIST = () => {
    return gql`
        mutation createDirectoryList(
            $name: String!
            $is_root: Boolean!
            $parent_id: Int
            $system_id: Int!
            $layout_id: Int!
            $image: Upload
        ) {
            createDirectoryList(
                input: {
                    name: $name
                    is_root: $is_root
                    layout_id: $layout_id
                    system_id: $system_id
                    parent_id: $parent_id
                    image: $image
                }
            ) {
                id
                name
            }
        }
    `;
};

export const EDIT_DIRECTORY_LIST = () => {
    return gql`
        mutation editDirectoryList(
            $id: ID!
            $name: String!
            $is_root: Boolean!
            $parent_id: Int
            $system_id: Int!
            $layout_id: Int!
            $image: Upload
        ) {
            editDirectoryList(
                input: {
                    id: $id
                    name: $name
                    is_root: $is_root
                    layout_id: $layout_id
                    system_id: $system_id
                    parent_id: $parent_id
                    image: $image
                }
            ) {
                id
                name
            }
        }
    `;
};

export const DELETE_DIR_LIST_ENTRY = () => {
    return gql`
        mutation deleteDirectoryListEntry(
            $directoryEntryIdList: [Dir_Entry_And_List_Change_Status_Request]
            $directoryListIdList: [Int]
            $systemId: Int
        ) {
            deleteDirectoryListEntry(
                directoryEntryIdList: $directoryEntryIdList
                directoryListIdList: $directoryListIdList
                systemId: $systemId
            ) {
                result
            }
        }
    `;
};
