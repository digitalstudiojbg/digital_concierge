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
            permissions {
                id
                name
            }
        }
    }
`;

export const getRoleDetail = gql`
    query roleDetail($id: ID!) {
        role(id: $id) {
            id
            name
            department {
                id
                name
            }
            permissions {
                id
                name
            }
        }
    }
`;
