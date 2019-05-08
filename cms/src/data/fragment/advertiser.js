import gql from "graphql-tag";

export const advertiserListFragment = gql`
    fragment advertiserList on Advertiser {
        id
        name
        active_advertising {
            id
            agreement_number
            articles {
                id
                name
            }
            commence_date
            expire_date
        }
    }
`;
