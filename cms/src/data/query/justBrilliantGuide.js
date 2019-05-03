import gql from "graphql-tag";
import { justBrilliantGuideDetailFragment } from "../fragment";

export const getJustBrilliantGuideList = gql`
    query getJustBrilliantGuideList {
        justBrilliantGuides {
            ...justBrilliantGuideDetail
        }
    }
    ${justBrilliantGuideDetailFragment}
`;

export const getJustBrilliantGuideDetail = gql`
    query getJustBrilliantGuideDetail($id: ID!) {
        justBrilliantGuide(id: $id) {
            ...justBrilliantGuideDetail
        }
    }
    ${justBrilliantGuideDetailFragment}
`;
