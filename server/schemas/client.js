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
        full_company_name: String
        nature_of_business: String
        address: String
        postal_address: String
        phone: String
        email: String
        active: Boolean
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
        contacts: [Contact]
        active_contract: Contract
        contracts: [Contract]
    }
`;
