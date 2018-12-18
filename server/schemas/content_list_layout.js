import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        content_list_layout(id: ID!): Content_List_Layout
        content_list_layouts: [Content_List_Layout]
    }

    type Content_List_Layout {
        id: ID!
        name: String
        validations: [Validation]
    }
`;
