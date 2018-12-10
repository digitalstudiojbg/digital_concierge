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
                name
            }
        }
    `;
};
