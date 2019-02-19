import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        contact(id: ID!): Contact
        contacts: [Contact]
        contactsByUser: [Contact]
    }

    extend type Mutation {
        createContact(input: CreateContactInput): Contact
        createUpdateDeleteContact(
            input: CreateUpdateDeleteContactInput
        ): [Contact]
    }

    input CreateContactInput {
        name: String!
        title: String!
        phone: String!
        mobile: String!
        email: EmailAddress!
        clientId: ID
    }

    input UpdateContactInput {
        id: Int!
        name: String!
        title: String!
        phone: String!
        mobile: String!
        email: EmailAddress!
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

    input CreateUpdateDeleteContactInput {
        clientId: Int!
        createContacts: [CreateContactInput]
        updateContacts: [UpdateContactInput]
        deleteContacts: [Int]
    }
`;
