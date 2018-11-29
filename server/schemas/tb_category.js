import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_category(id: ID!): TB_Category
        tb_categories: [TB_Category]
    }

    type TB_Category {
        id: ID!
        name: String
        has_directory: Boolean
        is_parent: Boolean
        child_category: [TB_Category]
    }
`;
