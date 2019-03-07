import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        layout(id: ID!): Layout
        layouts: [Layout]
    }

    type Layout {
        id: ID!
        name: String
        layout_family: LayoutFamily
        createdAt: DateTime
        updatedAt: DateTime
        templates: [Template]
        media: Media
    }
`;
