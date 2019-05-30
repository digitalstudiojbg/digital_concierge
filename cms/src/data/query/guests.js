import gql from "graphql-tag";

const getGuests = gql`
    query {
        guests {
            id
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
