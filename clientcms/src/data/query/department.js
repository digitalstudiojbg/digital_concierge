import gql from "graphql-tag";

export const getDepartmentListByUser = gql`
    query departments_by_user {
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

export const getDepartmentListByClient = gql`
    query departments_by_client($id: ID!) {
        departmentsByClient(id: $id) {
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
