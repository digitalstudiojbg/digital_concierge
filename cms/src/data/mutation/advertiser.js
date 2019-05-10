import gql from "graphql-tag";

export const CREATE_ADVERTISER = gql`
    mutation createAdvertiser($input: CreateAdvertiserInput) {
        createAdvertiser(input: $input) {
            id
        }
    }
`;

export const EDIT_ADVERTISER = gql`
    mutation editAdvertiser($input: UpdateAdvertiserInput) {
        editAdvertiser(input: $input) {
            id
        }
    }
`;
