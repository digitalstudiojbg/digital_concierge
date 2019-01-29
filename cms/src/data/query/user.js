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
                is_standard_role
                permissions {
                    name
                }
            }
            client {
                name
                full_company_name
                nature_of_business
                address
                postal_address
                phone
                email
                active
                number_of_users
                avatar
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
                full_company_name
                nature_of_business
                address
                postal_address
                phone
                email
                active
                number_of_users
                avatar
                systems {
                    id
                    name
                }
            }
        }
    }
`;
