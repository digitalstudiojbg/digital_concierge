import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        validation(id: ID!): Validation
        validations: [Validation]
    }

    type Validation {
        id: ID!
        name: String
        #td_directory_types: [TB_Directory_Type]
    }
`;
