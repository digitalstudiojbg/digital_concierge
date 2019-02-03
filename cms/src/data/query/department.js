import gql from "graphql-tag";

export const getDepartmentListByUser = gql`
    query departments_by_user {
        departmentsByUser {
            id
            name
            roles {
                id
                name
            }
        }
    }
`;
