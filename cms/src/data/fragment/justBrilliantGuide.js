import gql from "graphql-tag";

export const justBrilliantGuideDetailFragment = gql`
    fragment justBrilliantGuideDetail on JustBrilliantGuide {
        id
        name
        updatedAt
        media {
            id
            name
            path
            type
        }
        welcomeFamily {
            id
            name
        }
        featureFamily {
            id
            name
        }
        informationFamily {
            id
            name
        }
        mapFamily {
            id
            name
        }
        galleryFamily {
            id
            name
        }
        marketFamily {
            id
            name
        }
        foodFamily {
            id
            name
        }
        attractionFamily {
            id
            name
        }
        eventFamily {
            id
            name
        }
        essentialFamily {
            id
            name
        }
    }
`;

export const justBrilliantGuideListFragment = gql`
    fragment justBrilliantGuideList on JustBrilliantGuide {
        id
        name
        media {
            id
            name
            path
            type
        }
    }
`;
