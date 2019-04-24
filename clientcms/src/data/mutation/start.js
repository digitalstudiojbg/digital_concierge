import gql from "graphql-tag";

export const CREATE_START = gql`
    mutation createStart($input: CreateStartInput) {
        createStart(input: $input) {
            id
        }
    }
`;

export const EDIT_START = gql`
    mutation editStart($input: UpdateStartInput) {
        editStart(input: $input) {
            id
        }
    }
`;
