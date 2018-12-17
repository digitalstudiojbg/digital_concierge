import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        content_layout(id: ID!): Content_Layout
        content_layouts: [Content_Layout]
    }

    type Content_Layout {
        id: ID!
        name: String
        validations: [Validation]
    }
`;
