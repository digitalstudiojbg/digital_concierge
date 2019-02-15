import gql from "graphql-tag";

export const CREATE_THEMES = () => {
    return gql`
        mutation createThemes($input: [CreateThemeInput]) {
            createThemes(input: $input) {
                id
                headerFont
            }
        }
    `;
};
