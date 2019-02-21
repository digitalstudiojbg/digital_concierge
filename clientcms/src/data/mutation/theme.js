import gql from "graphql-tag";
import { themeDetailFragment } from "../fragment";

export const CREATE_THEMES = gql`
    mutation createThemes($input: [CreateThemeInput]) {
        createThemes(input: $input) {
            id
            headerFont
        }
    }
`;

export const UPDATE_THEMES = gql`
    mutation updateThemes($input: [UpdateThemeInput]) {
        updateThemes(input: $input) {
            ...themeDetail
        }
    }
    ${themeDetailFragment}
`;
