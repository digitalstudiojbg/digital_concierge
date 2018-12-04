import gql from "graphql-tag";

export const venueDetailFragment = gql`
    fragment venueDetail on Venue {
        id
        name
        active
    }
`;
