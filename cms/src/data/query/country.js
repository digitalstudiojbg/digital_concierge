import gql from "graphql-tag";

export const getCountryList = gql`
    query get_country_list {
        countries {
            id
            name
            states {
                id
                name
            }
        }
    }
`;
