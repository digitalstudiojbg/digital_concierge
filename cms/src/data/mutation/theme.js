import gql from "graphql-tag";

export const CREATE_THEMES = gql`
    mutation createThemes($input: [CreateThemeInput]) {
        createThemes(input: $input) {
            id
            headerFont
        }
    }
`;
