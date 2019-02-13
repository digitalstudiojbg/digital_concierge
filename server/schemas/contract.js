import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        contract(id: ID!): Contract
        contracts: [Contract]
        contractsByUser: [Contract]
    }

    extend type Mutation {
        createContract(input: CreateContractInput): Contract
    }

    type Contract {
        id: ID!
        number: String
        file: URL
        file_key: String
        agreement_date: DateTime
        renewal_date: DateTime
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
    }

    input CreateContractInput {
        number: String
        file: Upload!
        agreement_date: String
        renewal_date: String
        clientId: Int
    }
`;
