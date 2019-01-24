import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        client(id: ID!): Client
        clients: [Client]
        clientByUser: Client
    }

    type Client {
        id: ID!
        name: String
        has_parent_category: Boolean
        active: Boolean
        has_tablet: Boolean
        has_touchscreen: Boolean
        number_of_users: Int
        avatar: String
        createdAt: DateTime
        updatedAt: DateTime
        users: [User]
        departments: [Department]
        guests: [Guest]
        rooms: [Room]
        media: [Media]
        systems: [System]
        devices: [Device]
    }
`;
