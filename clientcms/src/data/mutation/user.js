import gql from "graphql-tag";

export const CREATE_USER = () => {
    return gql`
        mutation createUser($input: CreateUserInput) {
            createUser(input: $input) {
                id
                name
            }
        }
    `;
};

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput) {
        updateUser(input: $input) {
            id
            name
        }
    }
`;
