import gql from "graphql-tag";
import {
    advertiserListFragment,
    advertiserDetailFragment,
    paymentDetailFragment
} from "../fragment";

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

export const getAdvertiserActiveAgreement = gql`
    query getAdvertiserActiveAgreement($id: ID!) {
        advertiser(id: $id) {
            id
            active_advertising {
                id
                agreement_number
                agreement_date
                agreement_file
                agreement_file_key
                period_month
                commence_date
                expire_date
                artwork_supply_date
                media {
                    id
                    name
                    path
                }
                artwork_size {
                    id
                    name
                }
                articles {
                    id
                    name
                }
                payment {
                    ...paymentDetail
                }
            }
        }
    }
    ${paymentDetailFragment}
`;
