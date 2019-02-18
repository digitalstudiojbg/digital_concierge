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

export const getSystemsFromClient = gql`
    query get_systems_by_client($id: ID!) {
        systemsByClient(id: $id) {
            id
            name
            createdAt
            updatedAt
        }
    }
`;
