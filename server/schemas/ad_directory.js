import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        ad_directory(id: ID!): AD_Directory
        ad_directories: [AD_Directory]
    }

    type AD_Directory {
        id: ID!
        name: String
        active: Boolean
        ad_directory_type: AD_Directory_Type
    }
`;
