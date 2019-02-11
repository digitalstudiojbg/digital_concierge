import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        license(id: ID!): License
        licenses: [License]
    }

    type License {
        id: ID!
        key: String
        commence_date: DateTime
        expire_date: DateTime
        auto_renewal: Boolean
        active: Boolean
        licenseType: LicenseType
        client: Client
    }
`;
