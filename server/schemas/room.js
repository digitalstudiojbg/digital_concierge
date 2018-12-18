import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        room(id: ID!): Room
        rooms: [Room]
        rooms_by_venue(id: ID!): [Room]
    }

    type Room {
        id: ID!
        name: String
        lastname: String
        email: String
        guests: [Guest]
        venue: [Venue]
    }
`;
