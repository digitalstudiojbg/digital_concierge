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
        agreement_date: DateTime
        renewal_date: DateTime
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
    }
`;
