import gql from "graphql-tag";

export const changeCategoryStatus = () => {
    return gql`
        mutation changeCategoryStatus(
            $tbCategoryIdList: [Int]
            $status: Boolean
        ) {
            changeCategoryStatus(
                tbCategoryIdList: $tbCategoryIdList
                status: $status
            ) {
                id
                name
                active
            }
        }
    `;
};
