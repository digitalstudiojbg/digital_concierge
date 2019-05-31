import gql from "graphql-tag";

const mutationUpdateGuest = gql`
    mutation UpdateGuest($input: JSON!) {
        updateGuest(input: $input) {
            firstname
            lastname
            email
            phone1
            phone2
            client {
              id
            }
        }
    }
`;

export default mutationUpdateGuest;
