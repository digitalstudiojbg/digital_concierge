import gql from "graphql-tag";

export const getSelectedUserQuery = gql`
    query getUser {
        user(id: 1) {
            id
            name
            email
            active
            avatar
            createdAt
            updatedAt
            role {
                name
                is_admin
                permissions {
                    name
                }
            }
            venue {
                name
                logo
                number_of_users
                has_parent_category
                has_touchscreen
                has_tablet
                active
            }
        }
    }
`;

export const getCurrentUserQuery = gql`
    query getCurrentUser {
        getCurrentUser {
            id
            name
            email
            active
            avatar
            createdAt
            updatedAt
            role {
                name
                is_admin
                permissions {
                    name
                }
            }
            venue {
                name
                logo
                number_of_users
                has_parent_category
                has_touchscreen
                has_tablet
                active
            }
        }
    }
`;
