import gql from "graphql-tag";

export const changeDirectoryStatus = () => {
    return gql`
        mutation changeDirectoryStatus(
            $tbDirectoryId: Int!
            $tbCategoryId: Int!
            $status: Boolean
        ) {
            changeDirectoryStatus(
                tbDirectoryId: $tbDirectoryId
                tbCategoryId: $tbCategoryId
                status: $status
            ) {
                id
                name
            }
        }
    `;
};

export const changeDirectoryAndCategoryStatus = () => {
    /*return gql`
        mutation changeDirectoryAndCategoryStatus(
            $tbDirectoryIdList: [directory_category_request]
            $tbCategoryIdList: [Int]
            $status: Boolean
        ) {
            changeDirectoryAndCategoryStatus(
                tbDirectoryIdList: $tbDirectoryIdList
                tbCategoryIdList: $tbCategoryIdList
                status: $status
            ) {
                id
                name
            }
        }
    `;*/

    return gql`
        mutation changeDirectoryAndCategoryStatus(
            $tbDirectoryIdList: [Directory_Category_Request]
            $tbCategoryIdList: [Int]
            $status: Boolean
        ) {
            changeDirectoryAndCategoryStatus(
                tbDirectoryIdList: $tbDirectoryIdList
                tbCategoryIdList: $tbCategoryIdList
                status: $status
            ) {
                result
            }
        }
    `;
};
