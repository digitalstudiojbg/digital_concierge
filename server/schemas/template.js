import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        template(id: ID!): Template
        templates: [Template]
    }

    type Template {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        layouts: [Layout]
        validations: [Validation]
    }
`;
