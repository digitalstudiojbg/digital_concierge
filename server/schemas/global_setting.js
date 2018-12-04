import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        global_setting(id: ID!): Global_Setting
        global_settings: [Global_Setting]
    }

    type Global_Setting {
        id: ID!
        name: String
        venue: Venue
    }
`;
