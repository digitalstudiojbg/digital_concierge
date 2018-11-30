import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_directory_type(id: ID!): TB_Directory_Type
        tb_directory_types: [TB_Directory_Type]
    }

    type TB_Directory_Type {
        id: ID!
        name: String
        validations: [Validation]
    }
`;
