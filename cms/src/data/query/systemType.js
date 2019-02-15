import gql from "graphql-tag";

export const getSystemTypes = gql`
    query getSystemTypes {
        systemTypes {
            id
            name
        }
    }
`;
