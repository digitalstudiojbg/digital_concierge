import gql from "graphql-tag";

export const CREATE_DEPARTMENT = gql`
    mutation createDepartment($input: CreateDepartmentInput) {
        createDepartment(input: $input) {
            id
            name
            roles {
                id
                name
            }
        }
    }
`;

export const EDIT_DEPARTMENT = gql`
    mutation updateDepartment($input: UpdateDepartmentInput!) {
        updateDepartment(input: $input) {
            id
            name
            roles {
                id
                name
            }
        }
    }
`;
