import gql from "graphql-tag";

export const clientDetailFragment = gql`
    fragment clientDetail on Client {
        name
        full_company_name
        nature_of_business
        venue_address
        venue_city
        venue_zip_code
        postal_address
        postal_city
        postal_zip_code
        phone
        email
        active
        number_of_users
        avatar
        contacts {
            id
            name
            title
            phone
            mobile
            email
        }
        active_contract {
            id
            number
            file
            active
            renewal_date
        }
        contracts {
            id
            number
            file
            active
            renewal_date
        }
        postal_state {
            id
            name
        }
        venue_state {
            id
            name
        }
        media {
            id
            name
        }
        systems {
            id
            name
            devices_count
            device_type {
                id
                name
            }
            system_type {
                id
                name
            }
        }
    }
`;
