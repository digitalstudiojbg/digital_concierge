import gql from "graphql-tag";

export const CREATE_HOME = gql`
    mutation createHome($input: CreateHomeInput) {
        createHome(input: $input) {
            id
            header {
                id
                name
                path
                type
            }
            logo {
                id
                name
                path
                type
            }
        }
    }
`;

export const EDIT_HOME = gql`
    mutation editHome($input: UpdateHomeInput) {
        editHome(input: $input) {
            id
            header {
                id
                name
                path
                type
            }
            logo {
                id
                name
                path
                type
            }
        }
    }
`;
