import gql from "graphql-tag";

export const CREATE_DEPARTMENT = gql`
    mutation createDepartment($input: CreateDepartmentInput) {
        createDepartment(input: $input) {
            id
            name
        }
    }
`;

export const EDIT_DEPARTMENT = gql`
    mutation updateDepartment($input: UpdateDepartmentInput!) {
        updateDepartment(input: $input) {
            id
            name
        }
    }
`;

export const DELETE_DEPARTMENT = gql`
    mutation deleteDepartment($id: ID!, $clientId: ID!) {
        deleteDepartment(id: $id, clientId: $clientId) {
            id
            name
        }
    }
`;

export const DUPLICATE_DEPARTMENT = gql`
    mutation duplicateDepartment($input: DuplicateDepartmentInput) {
        duplicateDepartment(input: $input) {
            id
            name
        }
    }
`;
