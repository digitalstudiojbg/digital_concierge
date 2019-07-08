import gql from "graphql-tag";

export const getSelectedUserQuery = gql`
    query getUser {
        user(id: 1) {
            id
            name
            email
            active
            avatar
            first_phone_number
            second_phone_number
            position
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
                id
                name
                full_company_name
                nature_of_business
                venue_address
                venue_city
                venue_zip_code
                postal_address
                postal_city
                postal_zip_code
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
            first_phone_number
            second_phone_number
            position
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
                id
                name
            }
            # client {
            #     id
            #     name
            #     full_company_name
            #     nature_of_business
            #     venue_address
            #     venue_city
            #     venue_zip_code
            #     postal_address
            #     postal_city
            #     postal_zip_code
            #     phone
            #     email
            #     active
            #     number_of_users
            #     avatar
            #     systems {
            #         id
            #         name
            #     }
            # }
        }
    }
`;

export const getUserDetail = gql`
    query getUser($id: ID!) {
        user(id: $id) {
            id
            name
            email
            active
            roles {
                id
                name
                is_standard_role
                permissions {
                    id
                    name
                }
                department {
                    id
                    name
                }
            }
        }
    }
`;
