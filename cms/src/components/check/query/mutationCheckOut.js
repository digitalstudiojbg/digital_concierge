import gql from "graphql-tag";

const mutationCheckOut = gql`
    mutation mutationCheckOut($input: UpdateGuestRoomsInput, $deleteInput: DeleteGuestRoomsInput) {
        updateGuestRoom(input: $input) {
            createdAt
        }
        
        deleteGuestRoom(input: $deleteInput) {
            createdAt
        }
    }
`;

export default mutationCheckOut;
