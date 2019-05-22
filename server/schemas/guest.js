import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guest(id: ID!): Guest
        guests: [Guest]
    }
    
    extend type Mutation {
        createGuest(input: CreateGuestInput): Guest
        deleteGuest(input: DeleteGuestInput): Guest
        updateGuest(input: UpdateGuestInput): Guest
    }

    type Guest {
        id: ID!
        firstname: String
        lastname: String
        email: EmailAddress
        phone1: PhoneNumber
        phone2: PhoneNumber
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        rooms: [Room]
    }
    
    input CreateGuestInput {
        firstname: String!
        lastname: String!
        email: EmailAddress!
        phone1: PhoneNumber!
        phone2: PhoneNumber
        clientId: Int!
    }
    
    input UpdateGuestInput {
        id: ID!
        firstname: String
        lastname: String
        email: EmailAddress
        phone1: PhoneNumber
        phone2: PhoneNumber
    }
    
    input DeleteGuestInput {
        id: ID! 
    }
`;
