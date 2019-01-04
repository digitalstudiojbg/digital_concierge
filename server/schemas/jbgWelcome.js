import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        jbgWelcome(id: ID!): JbgWelcome
        jbgWelcomes: [JbgWelcome]
    }

    type JbgWelcome {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        layout: Layout
        justBrilliantGuides: [JustBrilliantGuide]
        media: [Media]
    }
`;
