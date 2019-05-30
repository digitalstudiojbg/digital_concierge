import gql from "graphql-tag";

export const getCurrencyList = gql`
    query getCurrencyList {
        currencies {
            id
            name
        }
    }
`;

export const getAdvertiserCurrencyList = gql`
    query advertiserCurrencyList($id: ID!) {
        advertiserCurrencyList(id: $id) {
            id
            name
        }
    }
`;
