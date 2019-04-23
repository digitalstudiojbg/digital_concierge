import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        start(id: ID!): Start
        starts: [Start]
    }

    type Start {
        id: ID!
        description: String
        button_text: String
        logoMediaId: Int
        logo: Media
        headerMediaId: Int
        header: Media
        colours: [JSON]
        colour1Hex: String
        colour1Alpha: Int
        colour2Hex: String
        colour2Alpha: Int
        colour3Hex: String
        colour3Alpha: Int
        colour4Hex: String
        colour4Alpha: Int
        colour5Hex: String
        colour5Alpha: Int
        createdAt: DateTime
        updatedAt: DateTime
        layout: Layout
        template: Template
        systems: [System]
        media: [Media]
    }
`;
