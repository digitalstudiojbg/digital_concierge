import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_category(id: ID!): TB_Category
        tb_categories: [TB_Category]
        td_categories_by_venue(id: ID!): [TB_Category]
    }

    type TB_Category {
        id: ID!
        name: String
        image: String
        active: Boolean
        has_directory: Boolean
        is_parent: Boolean
        child_category: [TB_Category]
        venues: [Venue]
        tb_directories: [TB_Directory]
    }
`;
