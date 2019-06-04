import gql from "graphql-tag";

export const contactDetailFragment = gql`
    fragment contactDetail on Contact {
        id
        name
        title
        phone
        mobile
        email
    }
`;
