import gql from "graphql-tag";

export const CREATE_SYSTEM = () => {
    return gql`
        mutation createSystem($input: CreateSystemInput) {
            createSystem(input: $input) {
                id
            }
        }
    `;
};
