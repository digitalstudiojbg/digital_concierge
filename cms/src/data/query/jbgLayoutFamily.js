import gql from "graphql-tag";

export const getJbgLayoutFamilyList = gql`
    query getJbgLayoutFamilyList {
        jbgLayoutFamilies {
            id
            name
            media {
                id
                name
                path
            }
        }
    }
`;
