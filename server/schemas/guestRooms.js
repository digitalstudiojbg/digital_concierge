import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guestRooms: [GuestRooms]
        guestRoomsByRoomId(roomId: Int!): [GuestRooms]
    }
    
    extend type Mutation {
        createGuestRoom(input: CreateGuestRoomsInput): GuestRooms
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
    }
    
    input UpdateGuestRoomsInput {
        checkin_date: String
        checkout_date: String
        guest_count: Int
        roomId: Int
        pin: Int
    }
`;
