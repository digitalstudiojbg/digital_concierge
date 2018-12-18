import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        directory(id: ID!): Directory
        directories: [Directory]
    }

    type Directory {
        id: ID!
        name: String
        content_layout: Content_Layout
        tiers: [Tier]
        media: [Media]
    }
`;
