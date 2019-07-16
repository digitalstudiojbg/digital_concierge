import gql from "graphql-tag";

export const CREATE_ROLE = gql`
    mutation createRole($input: CreateRoleInput) {
        createRole(input: $input) {
            id
            name
        }
    }
`;

export const DUPLICATE_ROLE = gql`
    mutation duplicateRole($id: ID!, $name: String!) {
        duplicateRole(id: $id, name: $name)
    }
`;

export const DELETE_ROLES = gql`
    mutation deleteRoles($input: DeleteRoleInput!) {
        deleteRoles(input: $input)
    }
`;
