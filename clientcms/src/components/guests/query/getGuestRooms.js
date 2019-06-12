import gql from "graphql-tag";

const getGuestsRooms = gql`
    query guestRooms($clientId: Int!) {
        guestRooms(clientId: $clientId) {
            pin
            active
            checkin_date
            checkout_date
            guest {
                id
                firstname
                lastname
            }
            guest_count
            room {
                id
            }
            total_nights
        }
    } 
`;

export default getGuestsRooms;
