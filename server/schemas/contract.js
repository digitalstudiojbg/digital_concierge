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
        file: String
        package: String
        active: Boolean
        client: Client
    }
`;
