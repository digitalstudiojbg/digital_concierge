import gql from "graphql-tag";

export const getClientFromUser = gql`
    query get_client_from_user {
        clientByUser {
            id
            name
            createdAt
            updatedAt
        }
    }
`;
