import gql from "graphql-tag";
import { globalSettingFragment, landingPageDetailFragment } from "../fragment";

export const getVenueDetailById = gql`
    query getVenueDetailById {
        venue(id: 1) {
            id
            name
            tb_categories {
                name
            }
            tb_landing_page {
                ...landingPageDetailFragment
            }
            global_setting {
                ...globalSettingDetail
            }
        }
    }
    ${landingPageDetailFragment}
    ${globalSettingFragment}
`;
