import gql from "graphql-tag";

export const getSystemsFromUser = gql`
    query get_systems_by_user {
        systemsByUser {
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export const systemsByClientQuery = gql`
    query systemsByClient($id: ID!) {
        systemsByClient(id: $id) {
            id
            name
            device_type {
                name
            }
            system_type {
                name
            }
        }
    }
`;
