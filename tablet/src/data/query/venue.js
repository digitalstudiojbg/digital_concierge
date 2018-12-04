import gql from "graphql-tag";

export const getVenueDetailById = gql`
    query getVenueDetailById {
        venue(id: 1) {
            id
            name
            users {
                name
            }
            roles {
                name
            }
            tb_categories {
                name
            }
            tb_landing_page {
                header_logo
            }
            global_setting {
                name
            }
        }
    }
`;
