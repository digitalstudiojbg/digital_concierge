import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        templateType(id: ID!): TemplateType
        templateTypes: [TemplateType]
        templateTypeFilter(name: String!): TemplateType
    }

    type TemplateType {
        id: ID!
        name: String
        templates: [Template]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
