import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgLayout(id: ID!): JBGLayout
        jbgLayouts: [JBGLayout]
        jbgLayoutsFromFamilyAndType(familyId: ID!, typeId: ID!): [JBGLayout]
        jbgLayoutsFromType(typeName: String!): [JBGLayout]
    }

    type JBGLayout {
        id: ID!
        name: String
        jbg_layout_family: JBGLayoutFamily
        jbg_layout_type: JBGLayoutType
        createdAt: DateTime
        updatedAt: DateTime
        jbg_templates: [JBGTemplate]
        media: Media
    }
`;
