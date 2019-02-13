import gql from "graphql-tag";

export const getCurrencyList = gql`
    query getCurrencyList {
        currencies {
            id
            name
        }
    }
`;
