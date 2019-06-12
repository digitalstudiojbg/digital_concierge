import gql from "graphql-tag";

const getGuestsRooms = gql`
    query guestRooms($input: Int!) {
        guestRooms(input: $input) {
            pin
            active
            checkin_date
            checkout_date
            guest {
                id
                firstname
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
