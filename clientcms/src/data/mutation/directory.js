import gql from "graphql-tag";

export const changeDirectoryListAndEntryStatus = () => {
    return gql`
        mutation changeDirectoryListAndEntryStatus(
            $directoryEntryIdList: [Dir_Entry_And_List_Change_Status_Request]
            $directoryListIdList: [Int]
            $status: Boolean
            $systemId: Int
        ) {
            changeDirectoryListAndEntryStatus(
                directoryEntryIdList: $directoryEntryIdList
                directoryListIdList: $directoryListIdList
                status: $status
                systemId: $systemId
            ) {
                result
            }
        }
    `;
};
