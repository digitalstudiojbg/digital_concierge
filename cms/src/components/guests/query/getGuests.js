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
            client {
                id
            }
            rooms {
                id
                name
                number
            }
        }
    }    
`;

export default getGuests;
