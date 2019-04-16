import gql from "graphql-tag";

export const CREATE_DIRECTORY_ENTRY = gql`
    mutation createDirectoryEntry($input: CreateDirectoryEntryInput) {
        createDirectoryEntry(input: $input) {
            id
            name
            media {
                id
                name
                path
                type
            }
        }
    }
`;

export const EDIT_DIRECTORY_ENTRY = gql`
    mutation editDirectoryEntry($input: UpdateDirectoryEntryInput) {
        editDirectoryEntry(input: $input) {
            id
            name
        }
    }
`;
