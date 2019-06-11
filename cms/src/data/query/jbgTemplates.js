import gql from "graphql-tag";

export const getJbgTemplateList = gql`
    query getJbgTemplateList {
        jbgTemplates {
            id
            name
            jbg_layouts {
                id
                name
            }
            validations {
                id
                name
            }
        }
    }
`;
