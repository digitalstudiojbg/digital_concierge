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
