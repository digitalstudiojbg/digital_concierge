import gql from "graphql-tag";

export const SET_ARTICLE_ACTIVE_INACTIVE = gql`
    mutation setArticleActiveInactive($id: ID!) {
        setArticleActiveInactive(id: $id) {
            id
        }
    }
`;
