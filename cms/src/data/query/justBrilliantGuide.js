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

export const getJustBrilliantGuideIdFromAdvertiser = gql`
    query getJustBrilliantGuideIdFromAdvertiser($id: ID!) {
        justBrilliantGuideFromAdvertiser(id: $id) {
            id
            name
        }
    }
`;

export const getArticlesFromJustBrilliantGuide = gql`
    query getArticlesFromJustBrilliantGuide($id: ID!) {
        justBrilliantGuide(id: $id) {
            id
            articles {
                id
                name
            }
        }
    }
`;
