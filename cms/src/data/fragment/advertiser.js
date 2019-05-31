import gql from "graphql-tag";
import { contactDetailFragment } from "./contact";
import { paymentDetailFragment } from "./payment";

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

export const advertiserDetailFragment = gql`
    fragment advertiserDetail on Advertiser {
        id
        name
        nature_of_business
        address
        city
        zip_code
        postal_address
        postal_city
        postal_zip_code
        phone
        email
        state {
            id
            name
            country {
                id
                name
            }
        }
        postal_state {
            id
            name
            country {
                id
                name
            }
        }
        active_advertising {
            id
            agreement_number
            agreement_date
            agreement_file
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
        contacts {
            ...contactDetail
        }
    }
    ${contactDetailFragment}
    ${paymentDetailFragment}
`;
