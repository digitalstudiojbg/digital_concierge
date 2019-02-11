import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        payment(id: ID!): Payment
        payments: [Payment]
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
