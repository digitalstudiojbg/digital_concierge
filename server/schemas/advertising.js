import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        advertising(id: ID!): Advertising
        advertisings: [Advertising]
    }

    extend type Mutation {
        createAdvertising(input: CreateAdvertisingInput): Advertising
        editAdvertising(input: UpdateAdvertisingInput): Advertising
    }

    type Advertising {
        id: ID!
        agreement_number: String
        agreement_date: DateTime
        agreement_file: URL
        agreement_file_key: String
        period_month: Int
        commence_date: DateTime
        expire_date: DateTime
        artwork_supply_date: DateTime
        active: Boolean
        createdAt: DateTime
        updatedAt: DateTime
        media: Media
        advertiser: Advertiser
        artwork_size: ArtworkSize
        payments: [Payment]
        payment: Payment
        articles: [Article]
    }

    input CreateAdvertisingInput {
        agreement_number: String!
        agreement_date: DateTime!
        agreement_file: Upload!
        payment: AdvertisingPaymentInput!
        period_month: Int
        commence_date: DateTime!
        expire_date: DateTime!
        advertiserId: ID!
    }

    input UpdateAdvertisingInput {
        id: ID!
        agreement_number: String!
        agreement_date: DateTime!
        agreement_file: Upload
        payment_id: ID!
        payment: AdvertisingPaymentInput!
        period_month: Int
        commence_date: DateTime!
        expire_date: DateTime!
    }

    input AdvertisingPaymentInput {
        invoice_number: String!
        invoice_date: DateTime!
        currencyId: ID!
        invoice_amount: Float!
        payable_date: DateTime!
    }
`;
