import gql from "graphql-tag";
import { clientDetailFragment } from "../fragment";

export const getClientFromUser = gql`
    query get_client_from_user {
        clientByUser {
            ...clientDetail
        }
        ${clientDetailFragment}
    }
`;

export const getClientDetail = gql`
    query get_client_detail($id: ID!) {
        client(id: $id) {
            ...clientDetail
        }
    }
    ${clientDetailFragment}
`;

export const getAllClients = gql`
    query get_all_clients {
        clients {
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
                agreement_date
                active
                renewal_date
            }
            contracts {
                id
                number
                file
                agreement_date
                active
                renewal_date
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
            users {
                id
                name
            }
            licenses {
                id
                key
                expire_date
            }
            systems {
                id
                name
            }
        }
    }
`;

export const getClientImageById = gql`
    query getClientImageById(
        $id: ID!
        $limit: Int!
        $offset: Int
        $sort: Int!
    ) {
        mediaByClient(id: $id, limit: $limit, offset: $offset, sort: $sort) {
            id
            name
            path
            totalImages
            createdAt
            size
            key
        }
    }
`;

export const getNewCreatedClientId = gql`
    {
        new_create_client_id @client
    }
`;

export const getUsersByClient = gql`
    query get_client_detail($id: ID!) {
        client(id: $id) {
            users {
                id
                name
                email
                active
                roles {
                    id
                    name
                    department {
                        id
                        name
                    }
                }
            }
        }
    }
`;
