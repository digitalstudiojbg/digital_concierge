import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgLayoutType(id: ID!): JBGLayoutType
        jbgLayoutTypes: [JBGLayoutType]
        jbgLayoutTypeFilter(name: String!): JBGLayoutType
    }

    type JBGLayoutType {
        id: ID!
        name: String
        jbg_layouts: [JBGLayout]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
