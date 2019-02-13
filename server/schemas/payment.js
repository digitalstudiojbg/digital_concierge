import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        payment(id: ID!): Payment
        payments: [Payment]
    }

    extend type Mutation {
        createPayment(input: CreatePaymentInput): Payment
    }

    input CreatePaymentInput {
        invoice_number: String!
        invoice_date: String!
        invoice_amount: Float!
        payable_date: String!
        currencyId: ID!
        clientId: ID!
    }

    type Payment {
        id: ID!
        invoice_number: String
        invoice_date: DateTime
        invoice_amount: Float
        payable_date: DateTime
        createdAt: DateTime
        updatedAt: DateTime
        currency: Currency
        client: Client
    }
`;
