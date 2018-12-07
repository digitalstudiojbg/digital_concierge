import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        ad_category(id: ID!): AD_Category
        ad_categories: [AD_Category]
    }

    type AD_Category {
        id: ID!
        name: String
        active: Boolean
        is_parent: Boolean
    }
`;
