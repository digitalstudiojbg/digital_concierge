import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        licenseType(id: ID!): LicenseType
        licenseTypes: [LicenseType]
    }

    type LicenseType {
        id: ID!
        name: String
        licenses: [License]
    }
`;
