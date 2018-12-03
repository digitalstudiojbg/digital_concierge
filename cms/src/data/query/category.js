import gql from "graphql-tag";
import { categoryDetailFragment } from "../fragment";

export const getTabletCategoryByVenue = venueId => {
    return gql`
        query get_tb_category_by_venue {
            tb_categories_by_venue(id: 1) {
                ...categoryDetail
                child_category {
                    ...categoryDetail
                    child_category {
                        ...categoryDetail
                        child_category {
                            ...categoryDetail
                            child_category {
                                ...categoryDetail
                            }
                        }
                    }
                }
            }
        }
        ${categoryDetailFragment}
    `;
};
