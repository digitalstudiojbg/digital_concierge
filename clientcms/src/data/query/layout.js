import gql from "graphql-tag";
// import { layoutDetailFragment } from "../fragment/layout";

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

export const getLayoutListFromType = gql`
    query layoutsFromType($typeName: String!) {
        layoutsFromType(typeName: $typeName) {
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
