import gql from "graphql-tag";

const getGuests = gql`
    query {
        guests {
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

export default getGuests;
