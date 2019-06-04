import gql from "graphql-tag";

export const getArtworkSizeList = gql`
    query getArtworkSizeList {
        artworkSizes {
            id
            name
        }
    }
`;
