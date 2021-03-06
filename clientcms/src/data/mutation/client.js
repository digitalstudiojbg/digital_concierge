import gql from "graphql-tag";

export const CREATE_CLIENT = () => {
    return gql`
        mutation createClient($input: CreateClientInput) {
            createClient(input: $input) {
                id
                name
            }
        }
    `;
};

export const UPDATE_CLIENT = gql`
    mutation updateClient($input: UpdateClientInput) {
        updateClient(input: $input) {
            id
            name
        }
    }
`;

export const UPLOAD_FILES_WITH_CLIENT_ID = gql`
    mutation uploadFilesWithClientId($files: [Upload!]!, $clientId: ID!) {
        uploadFilesWithClientId(files: $files, clientId: $clientId) {
            id
            name
        }
    }
`;

export const DELETE_FILES = gql`
    mutation deleteFiles($media: [DeleteFilesInput]) {
        deleteFiles(media: $media) {
            result
        }
    }
`;
