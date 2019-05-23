import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guest(id: ID!): Guest
        guests: [Guest]
        guestsByClientId(clientId: Int!): [Guest] 
        guestsByName(name: String!): [Guest]
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
        primary_number: PhoneNumber
        secondary_number: PhoneNumber
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        rooms: [Room]
        guest_rooms: [GuestRooms]
    }
    
    input CreateGuestInput {
        firstname: String!
        lastname: String!
        email: EmailAddress!
        primary_number: PhoneNumber!
        secondary_number: PhoneNumber
        clientId: Int!
    }
    
    input UpdateGuestInput {
        id: ID!
        firstname: String
        lastname: String
        email: EmailAddress
        primary_number: PhoneNumber
        secondary_number: PhoneNumber
    }
    
    input DeleteGuestInput {
        id: ID! 
    }
`;
