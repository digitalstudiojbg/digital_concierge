import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        client(id: ID!): Client
        clients: [Client]
        clientByUser: Client
    }

    extend type Mutation {
        createClient(input: CreateClientInput): Client
        uploadFilesWithClientId(files: [Upload!]!, clientId: ID!): [Media!]!
        deleteFiles(media: [DeleteFilesInput]): UploadFilesWithClientIdResult!
    }

    input DeleteFilesInput {
        id: Int
        key: String
    }

    type UploadFilesWithClientIdResult {
        result: Boolean
    }

    input CreateClientInput {
        name: String!
        full_company_name: String
        nature_of_business: String!
        venue_address: String!
        venue_city: String!
        venue_zip_code: String!
        venue_state_id: Int!
        postal_address: String!
        postal_city: String!
        postal_zip_code: String!
        postal_state_id: Int!
        phone: String!
        email: EmailAddress!
        number_of_users: Int!
        file: Upload!
    }

    type Client {
        id: ID!
        name: String!
        full_company_name: String!
        nature_of_business: String!
        venue_address: String!
        venue_city: String!
        venue_zip_code: String!
        postal_address: String!
        postal_city: String!
        postal_zip_code: String!
        phone: String!
        email: EmailAddress!
        active: Boolean!
        number_of_users: Int!
        avatar: URL!
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
        postal_state: State
        venue_state: State
    }
`;
