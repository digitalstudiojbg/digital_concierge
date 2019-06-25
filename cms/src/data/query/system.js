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
            aif
            numberOfDevices
            device_type {
                id
                name
            }
            system_type {
                id
                name
            }
            features {
                id
                name
            }
        }
    }
`;
