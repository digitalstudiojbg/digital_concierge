import gql from "graphql-tag";

export const getClientFromUser = gql`
    query get_client_from_user {
        clientByUser {
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
            contacts {
                id
                name
                title
                phone
                mobile
                email
            }
            active_contract {
                id
                number
                file
                package
                active
                term_month
                renewal_date
                annual_fee
            }
            contracts {
                id
                number
                file
                package
                active
                term_month
                renewal_date
                annual_fee
            }
            postal_state {
                id
                name
            }
            venue_state {
                id
                name
            }
            media {
                id
                name
            }
        }
    }
`;

export const getAllClients = gql`
    query get_all_clients {
        clients {
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
            contacts {
                id
                name
                title
                phone
                mobile
                email
            }
            active_contract {
                id
                number
                file
                package
                active
                term_month
                renewal_date
                annual_fee
            }
            contracts {
                id
                number
                file
                package
                active
                term_month
                renewal_date
                annual_fee
            }
            postal_state {
                id
                name
            }
            venue_state {
                id
                name
            }
            media {
                id
            }
        }
    }
`;

export const getClientImageById = gql`
    query getClientImageById($id: ID!) {
        client(id: $id) {
            media {
                id
                name
                path
                type
                key
            }
        }
    }
`;
