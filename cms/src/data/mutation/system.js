import gql from "graphql-tag";

export const CREATE_SYSTEM = gql`
    mutation createSystem($input: CreateSystemInput!) {
        createSystem(input: $input) {
            id
        }
    }
`;

export const EDIT_SYSTEM = gql`
    mutation editSystem($input: UpdateSystemInput!) {
        editSystem(input: $input) {
            id
        }
    }
`;

export const DELETE_SYSTEM = gql`
    mutation deleteSystem($id: ID!) {
        deleteSystem(id: $id) {
            id
        }
    }
`;
