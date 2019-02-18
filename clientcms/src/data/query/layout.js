import gql from "graphql-tag";

export const getLayoutList = gql`
    query getLayoutList {
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
`;
