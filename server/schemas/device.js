import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        device(id: ID!): Device
        devices: [Device]
    }

    type Device {
        id: ID!
        number: String
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        room: Room
        system: System
    }
`;
