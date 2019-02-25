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

export const DELETE_ROLES = gql`
    mutation deleteRoles($input: DeleteRoleInput) {
        deleteRoles(input: $input)
    }
`;

export const DUPLICATE_ROLES = gql`
    mutation duplicateRoles($input: DuplicateRoleInput) {
        duplicateRoles(input: $input)
    }
`;
