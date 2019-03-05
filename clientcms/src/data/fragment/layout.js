import gql from "graphql-tag";

export const layoutDetailFragment = gql`
    fragment layoutDetail on Layout {
        id
        name
        media {
            id
            path
            type
        }
    }
`;
