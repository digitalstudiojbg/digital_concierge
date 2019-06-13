import gql from "graphql-tag";

const mutationNewGuestCheckIn = gql`
    mutation newGuestCheckIn($input: newGuestCheckInInput) {
        newGuestCheckIn(input: $input) {
            createdAt
        }
    }
`;

export default mutationNewGuestCheckIn;
