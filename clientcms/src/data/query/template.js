import gql from "graphql-tag";

export const getTemplateListFromType = gql`
    query getTemplateListFromType($typeName: String!) {
        templatesByType(typeName: $typeName) {
            id
            name
            validations {
                id
                name
            }
        }
    }
`;
