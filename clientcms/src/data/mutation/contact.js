import gql from "graphql-tag";

export const CREATE_CONTACT = () => {
    return gql`
        mutation createContact($input: CreateContactInput) {
            createContact(input: $input) {
                id
                name
            }
        }
    `;
};

export const CREATE_UPDATE_DELETE_CONTACTS = gql`
    mutation createUpdateDeleteContacts(
        $input: CreateUpdateDeleteContactInput
    ) {
        createUpdateDeleteContact(input: $input) {
            id
            name
        }
    }
`;
