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
        primary_number: String
        secondary_number: String
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
        primary_number: String!
        secondary_number: String
        clientId: Int!
    }
    
    input UpdateGuestInput {
        id: ID!
        firstname: String
        lastname: String
        email: EmailAddress
        primary_number: String
        secondary_number: String
    }
    
    input DeleteGuestInput {
        id: ID! 
    }
`;
