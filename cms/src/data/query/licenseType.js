import gql from "graphql-tag";

export const getLicenseTypes = gql`
    query getLicenseTypes {
        licenseTypes {
            id
            name
        }
    }
`;
