import gql from "graphql-tag";

export const CREATE_CLIENT = () => {
    return gql`
        mutation createClient($input: CreateClientInput) {
            createClient(input: $input) {
                id
                name
            }
        }
    `;
};
