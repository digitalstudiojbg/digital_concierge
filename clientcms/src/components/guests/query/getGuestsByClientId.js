import gql from "graphql-tag";

const getGuestsByClientId = gql`
    query guestsByClientId($input: Int!) {
        guestsByClientId(clientId: $input) {
            id
            firstname
            lastname
            primary_number
            secondary_number
            email
            guest_rooms {
                checkout_date
                checkin_date
                guest_count
                room {
                    id
                    number
                }
                pin
                active
            }
            client {
                id
            }
        }
    }    
`;

export default getGuestsByClientId;
