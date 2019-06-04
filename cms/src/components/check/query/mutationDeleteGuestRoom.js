import gql from "graphql-tag";

const mutationDeleteGuestRoom = gql`
    mutation mutationDeleteGuestRoom($input: DeleteGuestRoomsInput) {
        deleteGuestRoom(input: $input) {
            createdAt
        }
    }
`;

export default mutationDeleteGuestRoom;
