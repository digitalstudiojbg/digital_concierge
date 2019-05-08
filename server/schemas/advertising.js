import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        advertising(id: ID!): Advertising
        advertisings: [Advertising]
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
        articles: [Article]
    }
`;
