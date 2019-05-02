import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgLayoutFamily(id: ID!): JBGLayoutFamily
        jbgLayoutFamilies: [JBGLayoutFamily]
        jbgLayoutFamilyFilter(name: String!): JBGLayoutFamily
    }

    type JBGLayoutFamily {
        id: ID!
        name: String
        jbg_layouts: [JBGLayout]
        jbgLayoutsByType(typeName: String!): [JBGLayout]
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
