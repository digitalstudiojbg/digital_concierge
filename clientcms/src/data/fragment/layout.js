import gql from "graphql-tag";

export const layoutDetailFragment = gql`
    fragment LayoutDetail on Layout {
        id
        name
        media {
            id
            path
            type
        }
    }
`;
