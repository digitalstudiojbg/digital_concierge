import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_directory(id: ID!): TB_Directory
        tb_directories: [TB_Directory]
    }

    extend type Mutation {
        changeDirectoryStatus(
            tbCategoryId: Int
            tbDirectoryId: Int
            status: Boolean
        ): [TB_Directory]

        changeDirectoryAndCategoryStatus(
            tbDirectoryIdList: [Directory_Category_Request]
            tbCategoryIdList: [Int]
            status: Boolean
        ): Directory_Category_Response
    }

    type TB_Directory {
        id: ID!
        name: String
        body: String
        active: Boolean
        image: String
        phone: String
        address: String
        opening_hours: String
        tb_categories: [TB_Category]
        tb_directory_type: TB_Directory_Type
    }

    type Directory_Category_Response {
        result: Boolean
    }

    input Directory_Category_Request {
        tbDirectoryId: Int
        tbCategoryId: Int
    }
`;
