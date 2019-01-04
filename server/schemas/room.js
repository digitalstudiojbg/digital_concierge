import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        room(id: ID!): Room
        rooms: [Room]
    }

    type Room {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        guests: [Guest]
        client: Client
        device: Device
    }
`;
