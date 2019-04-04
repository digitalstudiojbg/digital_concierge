import gql from "graphql-tag";

export const getLayoutFamilyList = gql`
    query getLayoutFamilyList($typeName: String!) {
        layoutFamilies {
            id
            name
            layoutsByType(typeName: $typeName) {
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
    query getLayoutFamilyDetailFilter($name: String!, $typeName: String!) {
        layoutFamilyFilter(name: $name) {
            id
            name
            layoutsByType(typeName: $typeName) {
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
