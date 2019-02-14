import gql from "graphql-tag";

export const getFeatures = gql`
    query getFeatures {
        features {
            id
            name
        }
    }
`;
