import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        ad_directory_type(id: ID!): AD_Directory_Type
        ad_directory_types: [AD_Directory_Type]
    }

    type AD_Directory_Type {
        id: ID!
        name: String
    }
`;
