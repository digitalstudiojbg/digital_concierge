import gql from "graphql-tag";
import {
    globalSettingFragment,
    landingPageDetailFragment,
    venueDetailFragment
} from "../fragment";

export const getVenueDetailById = gql`
    query getVenueDetailById {
        venue(id: 1) {
            ...venueDetail
            tb_categories {
                name
            }
            tb_landing_page {
                ...landingPageDetail
            }
            global_setting {
                ...globalSettingDetail
            }
        }
    }
    ${venueDetailFragment}
    ${landingPageDetailFragment}
    ${globalSettingFragment}
`;
