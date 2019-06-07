import gql from "graphql-tag";
import { articleListFragment, articleDetailFragment } from "../fragment";

export const getArticleDetail = gql`
    query getArticleDetail($id: ID!) {
        article(id: $id) {
            ...articleDetail
        }
    }
    ${articleDetailFragment}
`;

export const getArticleListFromPublication = gql`
    query getArticleFromPublication($id: ID!) {
        articlesByPublication(id: $id) {
            ...articleList
        }
    }
    ${articleListFragment}
`;
