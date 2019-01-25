import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        contact(id: ID!): Contact
        contacts: [Contact]
        contactsByUser: [Contact]
    }

    type Contact {
        id: ID!
        name: String
        title: String
        phone: String
        mobile: String
        email: EmailAddress
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
    }
`;
