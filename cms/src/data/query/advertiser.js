import gql from "graphql-tag";
import { advertiserListFragment } from "../fragment";

export const getAdvertiserFromPublication = gql`
    query getAdvertiserFromPublication($id: ID!) {
        advertisersByPublication(id: $id) {
            ...advertiserList
        }
    }
    ${advertiserListFragment}
`;

export const getAdvertiserList = gql`
    query getAdvertiserList {
        advertisers {
            ...advertiserList
        }
    }
    ${advertiserListFragment}
`;
