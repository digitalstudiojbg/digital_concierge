import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        contract(id: ID!): Contract
        contracts: [Contract]
        contractsByUser: [Contract]
    }

    type Contract {
        id: ID!
        number: String
        file: URL
        package: String
        term_month: String
        renewal_date: DateTime
        annual_fee: String
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
    }
`;
