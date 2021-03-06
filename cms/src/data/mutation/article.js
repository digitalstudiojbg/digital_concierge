import gql from "graphql-tag";

export const SET_ARTICLE_ACTIVE_INACTIVE = gql`
    mutation setArticleActiveInactive($id: ID!) {
        setArticleActiveInactive(id: $id) {
            id
        }
    }
`;

export const MOVE_ARTICLE_UP_BY_ONE = gql`
    mutation moveArticleUpByOne($id: ID!) {
        moveArticleUp(id: $id) {
            id
        }
    }
`;

export const MOVE_ARTICLE_DOWN_BY_ONE = gql`
    mutation moveArticleDownByOne($id: ID!) {
        moveArticleDown(id: $id) {
            id
        }
    }
`;

export const CREATE_ARTICLE = gql`
    mutation createArticle($input: CreateArticleInput) {
        createArticle(input: $input) {
            id
        }
    }
`;

export const EDIT_ARTICLE = gql`
    mutation editArticle($input: UpdateArticleInput) {
        editArticle(input: $input) {
            id
        }
    }
`;
