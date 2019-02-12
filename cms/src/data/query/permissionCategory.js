import gql from "graphql-tag";

export const getPermissionCategoryList = gql`
    query get_permission_category_list {
        permissionCategories {
            id
            name
            permissions {
                id
                name
            }
        }
    }
`;
