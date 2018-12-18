import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        landing_page_layout(id: ID!): Landing_Page_Layout
        landing_page_layouts: [Landing_Page_Layout]
    }

    type Landing_Page_Layout {
        id: ID!
        name: String
        validations: [Validation]
    }
`;
