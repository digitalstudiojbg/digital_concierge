import gql from "graphql-tag";

const mutationCreateGuestRoom = gql`
    mutation {
      createGuestRoom(input: {
        checkin_date: "2019-10-20T11:00:00"
        checkout_date: "2019-10-29T09:00:00"
        guest_count: 1
        roomId: 1
        guestId: 3
        pin: 1111
        active: 0
      }) {
        guest_count
      }
    } 
`;

export default mutationCreateGuestRoom;
