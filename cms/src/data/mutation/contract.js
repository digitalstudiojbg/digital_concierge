import gql from "graphql-tag";

export const CREATE_CONTRACT = () => {
    return gql`
        mutation createContract($input: CreateContractInput) {
            createContract(input: $input) {
                id
                number
            }
        }
    `;
};
