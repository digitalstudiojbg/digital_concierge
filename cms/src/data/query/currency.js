import gql from "graphql-tag";

export const getCurrencyList = gql`
    query getCurrencyList {
        currencies {
            id
            name
            code
        }
    }
`;

export const getAdvertiserCurrencyList = gql`
    query advertiserCurrencyList($id: ID!) {
        advertiserCurrencyList(id: $id) {
            id
            name
            code
        }
    }
`;
