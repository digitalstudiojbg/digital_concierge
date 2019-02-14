import gql from "graphql-tag";

export const getDeviceTypes = gql`
    query getDeviceTypes {
        deviceTypes {
            id
            name
        }
    }
`;
