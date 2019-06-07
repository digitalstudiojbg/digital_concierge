import gql from "graphql-tag";
import { mediaDetailFragment } from ".";

export const articleListFragment = gql`
    fragment articleList on Article {
        id
        name
        order
        jbg_template {
            id
            name
        }
        jbg_layout {
            id
            name
            jbg_layout_family {
                id
                name
            }
        }
        createdAt
        updatedAt
        active
    }
`;

export const articleDetailFragment = gql`
    fragment articleDetail on Article {
        id
        name
        order
        description
        introductionText
        active
        createdAt
        updatedAt
        justBrilliantGuideId
        header_image {
            ...mediaDetail
        }
        feature_image {
            ...mediaDetail
        }
        jbg_template {
            id
            name
        }
        jbg_layout {
            id
            name
            jbg_layout_family {
                id
                name
            }
        }
    }
    ${mediaDetailFragment}
`;
