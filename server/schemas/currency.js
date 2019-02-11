import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        currency(id: ID!): Currency
        currencies: [Currency]
    }

    type Currency {
        id: ID!
        name: String
        countries: [Country]
        payments: [Payment]
    }
`;
