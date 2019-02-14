import gql from "graphql-tag";

export const CREATE_ROLE = () => {
    return gql`
        mutation createRole($input: CreateRoleInput) {
            createRole(input: $input) {
                id
                name
            }
        }
    `;
};
