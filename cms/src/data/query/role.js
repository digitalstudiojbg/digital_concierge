import gql from "graphql-tag";

export const getRoleList = gql`
    query roles_list($clientId: ID!) {
        rolesByClientId(clientId: $clientId) {
            id
            name
            department {
                id
                name
            }
        }
    }
`;
