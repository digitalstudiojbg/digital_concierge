import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        layout(id: ID!): Layout
        layouts: [Layout]
        layoutsFromFamilyAndType(familyId: ID!, typeId: ID!): [Layout]
        layoutsFromType(typeName: String!): [Layout]
    }

    type Layout {
        id: ID!
        name: String
        layout_family: LayoutFamily
        layout_type: LayoutType
        createdAt: DateTime
        updatedAt: DateTime
        templates: [Template]
        media: Media
    }
`;
