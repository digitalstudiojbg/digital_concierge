import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgTemplate(id: ID!): JBGTemplate
        jbgTemplates: [JBGTemplate]
        jbgTemplateByType(typeName: String!): [JBGTemplate]
    }

    type JBGTemplate {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        jbg_layouts: [JBGLayout]
        jbg_template_type: JBGTemplateType
        validations: [Validation]
    }
`;
