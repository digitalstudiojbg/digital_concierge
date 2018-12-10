import gql from "graphql-tag";

export const changeDirectoryStatus = () => {
    return gql`
        mutation changeDirectoryStatus {
            changeDirectoryStatus(
                tbDirectoryId: 3
                tbCategoryId: 10
                status: false
            ) {
                name
            }
        }
    `;
};
