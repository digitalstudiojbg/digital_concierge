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

export const getJustBrilliantGuideLayoutFamilyDefaults = gql`
    query getJustBrilliantGuideLayoutFamilyDefaults($id: ID!) {
        justBrilliantGuide(id: $id) {
            id
            welcomeFamilyId
            featureFamilyId
            informationFamilyId
            mapFamilyId
            galleryFamilyId
            marketFamilyId
            foodFamilyId
            attractionFamilyId
            eventFamilyId
            essentialFamilyId
        }
    }
`;
