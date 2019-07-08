import gql from "graphql-tag";

export const CREATE_ROLE = gql`
    mutation createRole($input: CreateRoleInput) {
        createRole(input: $input) {
            id
            name
        }
    }
`;
