import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        palette(id: ID!): Palette
        palettes: [Palette]
        palettesByClient(id: ID!): [Palette]
    }

    type Palette {
        id: ID!
        name: String
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
        client: Client
    }
`;
