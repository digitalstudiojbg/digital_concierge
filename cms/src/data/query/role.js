import gql from "graphql-tag";

export const getRoleList = gql`
    query roles_list {
        departmentsByUser {
            id
            name
            roles {
                id
                name
                permissions {
                    id
                    name
                }
            }
        }
    }
`;
