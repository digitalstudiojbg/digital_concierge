import gql from "graphql-tag";

const mutationUpdateGuestRoom = gql`
    mutation mutationUpdateGuestRoom($input: UpdateGuestRoomsInput) {
        updateGuestRoom(input: $input) {
            createdAt
        }
    }
`;

export default mutationUpdateGuestRoom;
