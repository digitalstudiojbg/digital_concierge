import gql from "graphql-tag";

export const CREATE_PALETTE = gql`
    mutation createPalette($input: CreatePaletteInput) {
        createPalette(input: $input) {
            id
            name
        }
    }
`;
