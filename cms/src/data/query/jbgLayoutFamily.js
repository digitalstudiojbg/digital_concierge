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

export const getJbgLayoutFamilyDetailedList = gql`
    query getJbgLayoutFamilyDetailedList {
        jbgLayoutFamilies {
            id
            name
            media {
                id
                name
                path
            }
            jbg_layouts {
                id
                name
                media {
                    id
                    name
                    path
                }
                jbg_templates {
                    id
                    name
                }
            }
        }
    }
`;
