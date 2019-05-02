import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgTemplateType(id: ID!): JBGTemplateType
        jbgTemplateTypes: [JBGTemplateType]
        jbgTemplateTypeFilter(name: String!): JBGTemplateType
    }

    type JBGTemplateType {
        id: ID!
        name: String
        jbg_templates: [JBGTemplate]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
