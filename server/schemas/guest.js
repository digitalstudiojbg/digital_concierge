import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guest(id: ID!): Guest
        guests: [Guest]
        guests_by_venue(id: ID!): [Guest]
    }

    type Guest {
        id: ID!
        firstname: String
        lastname: String
        email: String
        rooms: [Room]
        venue: Venue
    }
`;
