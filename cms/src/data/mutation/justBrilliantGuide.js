import gql from "graphql-tag";

export const CREATE_GUIDE = gql`
    mutation createJustBrilliantGuide($input: CreateJustBrilliantGuideInput) {
        createJustBrilliantGuide(input: $input) {
            id
        }
    }
`;

export const EDIT_GUIDE = gql`
    mutation editJustBrilliantGuide($input: UpdateJustBrilliantGuideInput) {
        editJustBrilliantGuide(input: $input) {
            id
        }
    }
`;
