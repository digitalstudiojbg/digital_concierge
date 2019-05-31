import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guestRooms: [GuestRooms]
        guestRoomsByRoomId(roomId: Int!): [GuestRooms]
        guestRoomsByGuestId(guestId: Int!): [GuestRooms]
    }
    
    extend type Mutation {
        createGuestRoom(input: CreateGuestRoomsInput): GuestRooms
        deleteGuestRoom(input: DeleteGuestRoomsInput): GuestRooms
        updateGuestRoom(input: UpdateGuestRoomsInput): GuestRooms
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
        roomId: Int!
        guestId: Int!
        pin: Int!
        active: Int!
    }
    
    input UpdateGuestRoomsInput {
        roomId: Int!
        guestId: Int!
        checkout_date: String
        guest_count: Int
        pin: Int
        active: Int
        is_sending_survey: Boolean
    }
    
    input DeleteGuestRoomsInput {
        roomId: Int!
        guestId: Int!
    }
`;
