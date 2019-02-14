import gql from "graphql-tag";

export const getFeaturesByCategories = gql`
    query getFeaturesByCategories {
        featureCategories {
            id
            name
            features {
                id
                name
            }
        }
    }
`;
