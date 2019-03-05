import gql from "graphql-tag";

export const getLayoutFamilyList = gql`
    query getLayoutFamilyList {
        layoutFamilies {
            id
            name
            layouts {
                id
                name
                media {
                    id
                    path
                    type
                }
            }
        }
    }
`;

export const getLayoutFamilyDetailFilter = gql`
    query getLayoutFamilyDetailFilter($name: String!) {
        layoutFamilyFilter(name: $name) {
            id
            name
            layouts {
                id
                name
                media {
                    id
                    path
                    type
                }
            }
        }
    }
`;
