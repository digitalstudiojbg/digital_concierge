import gql from "graphql-tag";

export const mediaDetailFragment = gql`
    fragment mediaDetail on Media {
        id
        name
        path
        type
    }
`;
