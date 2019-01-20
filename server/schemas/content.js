import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        content(id: ID!): Content
        contents: [Content]
    }

    type Content {
        id: ID!
        name: String
        child_contents: [Content]
    }
`;
