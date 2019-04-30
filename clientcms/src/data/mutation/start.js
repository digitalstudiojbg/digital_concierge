import gql from "graphql-tag";

export const CREATE_START = gql`
    mutation createStart($input: CreateStartInput) {
        createStart(input: $input) {
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

export const EDIT_START = gql`
    mutation editStart($input: UpdateStartInput) {
        editStart(input: $input) {
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
