import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput) {
        createUser(input: $input) {
            id
            name
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput) {
        updateUser(input: $input) {
            id
            name
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUsers($input: DeleteUserInput) {
        deleteUsers(input: $input) {
            id
            name
        }
    }
`;
