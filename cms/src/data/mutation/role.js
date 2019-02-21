import gql from "graphql-tag";

export const CREATE_ROLE = gql`
    mutation createRole($input: CreateRoleInput) {
        createRole(input: $input) {
            id
            name
        }
    }
`;

export const UPDATE_ROLE = gql`
    mutation updateRole($input: UpdateRoleInput) {
        updateRole(input: $input) {
            id
            name
        }
    }
`;
