import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        advertiser(id: ID!): Advertiser
        advertisers: [Advertiser]
        advertisersByPublication(id: ID!): [Advertiser]
    }

    extend type Mutation {
        createAdvertiser(input: CreateAdvertiserInput): Advertiser
        editAdvertiser(input: UpdateAdvertiserInput): Advertiser
    }

    type Advertiser {
        id: ID!
        name: String!
        nature_of_business: String!
        address: String!
        city: String!
        zip_code: String!
        postal_address: String!
        postal_city: String!
        postal_zip_code: String!
        phone: String!
        email: EmailAddress!
        active: Boolean!
        createdAt: DateTime
        updatedAt: DateTime
        state: State
        postal_state: State
        just_brilliant_guide: JustBrilliantGuide
        active_advertising: Advertising
        advertising: [Advertising]
        contacts: [Contact]
    }

    input CreateAdvertiserInput {
        name: String!
        nature_of_business: String!
        address: String!
        city: String!
        zip_code: String!
        postal_address: String!
        postal_city: String!
        postal_zip_code: String!
        phone: String!
        email: EmailAddress!
        contacts: [AdvertiserContactInput]!
        stateId: ID!
        postalStateId: ID!
        justBrilliantGuideId: ID!
    }

    input UpdateAdvertiserInput {
        id: ID!
        name: String!
        nature_of_business: String!
        address: String!
        city: String!
        zip_code: String!
        postal_address: String!
        postal_city: String!
        postal_zip_code: String!
        phone: String!
        email: EmailAddress!
        contacts: [AdvertiserContactInput]!
        stateId: ID!
        postalStateId: ID!
    }

    input AdvertiserContactInput {
        name: String!
        title: String!
        phone: String!
        mobile: String
        email: EmailAddress!
        advertiserId: Int!
    }
`;
