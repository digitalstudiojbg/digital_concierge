import gql from "graphql-tag";

export const CREATE_DIRECTORY_LIST = () => {
    return gql`
        mutation createDirectoryList($input: CreateDirectoryListInput) {
            createDirectoryList(input: $input) {
                id
                name
                media {
                    id
                    name
                    path
                    type
                }
            }
        }
    `;
};

export const EDIT_DIRECTORY_LIST = () => {
    return gql`
        mutation editDirectoryList($input: UpdateDirectoryListInput) {
            editDirectoryList(input: $input) {
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
