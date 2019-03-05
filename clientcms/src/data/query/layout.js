import gql from "graphql-tag";
import { layoutDetailFragment } from "../fragment";

export const getLayoutList = gql`
    query getLayoutList {
        layouts {
            ...layoutDetail
        }
        ${layoutDetailFragment}
    }
`;
