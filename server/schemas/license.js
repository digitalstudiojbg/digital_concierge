import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        license(id: ID!): License
        licenses: [License]
    }

    extend type Mutation {
        createLicense(input: CreateLicenseInput): License
    }

    input CreateLicenseInput {
        key: String!
        license_type_id: Int!
        commence_date: String!
        expire_date: String!
        auto_renewal: Boolean!
        clientId: ID!
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
