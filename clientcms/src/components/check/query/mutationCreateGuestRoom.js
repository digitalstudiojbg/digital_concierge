import gql from "graphql-tag";

const mutationCreateGuestRoom = gql`
    mutation createGuestRoom($input: CreateGuestRoomsInput) {
        createGuestRoom(input: $input) {
            createdAt
        }
    }

`;

export default mutationCreateGuestRoom;
