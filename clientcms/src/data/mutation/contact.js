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
