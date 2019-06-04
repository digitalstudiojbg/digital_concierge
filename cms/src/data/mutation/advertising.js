import gql from "graphql-tag";

export const CREATE_ADVERTISING = gql`
    mutation createAdvertising($input: CreateAdvertisingInput) {
        createAdvertising(input: $input) {
            id
        }
    }
`;

export const EDIT_ADVERTISING = gql`
    mutation editAdvertising($input: UpdateAdvertisingInput) {
        editAdvertising(input: $input) {
            id
        }
    }
`;

export const EDIT_ADVERTISING_ARTWORK = gql`
    mutation editAdvertisingArtwork($input: AdvertisingArtworkInput) {
        editAdvertisingArtwork(input: $input) {
            id
        }
    }
`;
