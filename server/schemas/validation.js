import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        validation(id: ID!): Validation
        validations: [Validation]
    }

    type Validation {
        id: ID!
        name: String
        content_layouts: [Content_Layout]
    }
`;
