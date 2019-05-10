import gql from "graphql-tag";
import { advertiserListFragment, advertiserDetailFragment } from "../fragment";

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

export const getAdvertiserDetail = gql`
    query getAdvertiserDetail($id: ID!) {
        advertiser(id: $id) {
            ...advertiserDetail
        }
    }
    ${advertiserDetailFragment}
`;
