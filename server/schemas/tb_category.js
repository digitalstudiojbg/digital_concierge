import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_category(id: ID!): TB_Category
        tb_categories: [TB_Category]
        tb_categories_by_venue(id: ID!): [TB_Category]
    }

    type TB_Category {
        id: ID!
        name: String
        image: String
        active: Boolean
        has_directory: Boolean
        tb_directory_type: TB_Directory_Type
        child_category: [TB_Category]
        venues: [Venue]
        tb_directories: [TB_Directory]
        tb_directories_active: [TB_Directory]
        tb_media: [TB_MEDIA]
    }
`;
