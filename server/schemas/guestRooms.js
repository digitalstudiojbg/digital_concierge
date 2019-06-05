import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guestRooms: [GuestRooms]
        guestRoomsByRoomNumber(room_number: Int!, clientId: Int!): [GuestRooms]
        guestRoomsByGuestId(guestId: Int!): [GuestRooms]
        guestRoomsCheckOut(name: String!): [GuestRooms]
    }
    
    extend type Mutation {
        createGuestRoom(input: CreateGuestRoomsInput): GuestRooms
        deleteGuestRoom(input: DeleteGuestRoomsInput): GuestRooms
        updateGuestRoom(input: UpdateGuestRoomsInput): GuestRooms
        newGuestCheckIn(input: newGuestCheckInInput): GuestRooms
    }

    type GuestRooms {
        createdAt: DateTime
        updatedAt: DateTime
        guest: Guest
        room: Room
        pin: Int
        active: Int
        checkout_date: DateTime
        checkin_date: DateTime
        total_nights: Int
        guest_count: Int
    }
    
    input CreateGuestRoomsInput {
        checkin_date: String!
        checkout_date: String!
        guest_count: Int!
        room_number: Int!
        guestId: Int!
        pin: Int!
        active: Int!
        clientId: Int! 
    }
    
    input newGuestCheckInInput {
        firstname: String!
        lastname: String!
        email: EmailAddress!
        primary_number: String!
        secondary_number: String
        clientId: Int!
        checkin_date: String!
        checkout_date: String!
        guest_count: Int!
        room_number: Int!
        pin: Int!
        active: Int!
    }
    
    input UpdateGuestRoomsInput {
        room_number: Int!
        guestId: Int!
        checkout_date: String
        guest_count: Int
        pin: Int
        active: Int
        is_sending_survey: Boolean
        clientId: Int!
    }
    
    input DeleteGuestRoomsInput {
        room_number: Int!
        guestId: Int!
        clientId: Int!
    }
`;
