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
            roles {
                name
                is_admin
                permissions {
                    name
                }
            }
            client {
                name
                avatar
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
            roles {
                name
                is_standard_role
                permissions {
                    name
                }
            }
            client {
                name
                avatar
                number_of_users
                has_parent_category
                has_touchscreen
                has_tablet
                active
                systems {
                    id
                    name
                }
            }
        }
    }
`;
