import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        template(id: ID!): Template
        templates: [Template]
        templatesByType(typeName: String!): [Template]
    }

    type Template {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        layouts: [Layout]
        template_type: TemplateType
        validations: [Validation]
    }
`;
