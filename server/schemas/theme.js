import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        theme(id: ID!): Theme
        themes: [Theme]
    }

    extend type Mutation {
        createThemes(input: [CreateThemeInput]): [Theme]
        updateThemes(input: [UpdateThemeInput]): [Theme]
    }

    type Theme {
        id: ID!
        companyLogo: URL
        companyLogoURL: URL
        headerFont: String
        subHeaderFont: String
        bodyFont: String
        captionFont: String
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
        defaultStartLayoutId: Int
        defaultStartLayout: Layout
        defaultHomeLayoutId: Int
        defaultHomeLayout: Layout
        defaultDirListLayoutId: Int
        defaultDirListLayout: Layout
        defaultDirEntryLayoutId: Int
        defaultDirEntryLayout: Layout
        system: System
    }

    input CreateThemeInput {
        companyLogo: Upload!
        headerFont: String!
        subHeaderFont: String!
        bodyFont: String!
        captionFont: String!
        colours: [ColourThemeInput]!
        defaultStartLayoutId: Int!
        defaultHomeLayoutId: Int!
        defaultDirListLayoutId: Int!
        defaultDirEntryLayoutId: Int!
        systemId: Int!
    }

    input UpdateThemeInput {
        id: Int!
        companyLogo: Upload
        headerFont: String!
        subHeaderFont: String!
        bodyFont: String!
        captionFont: String!
        colours: [ColourThemeInput]!
        defaultStartLayoutId: Int!
        defaultHomeLayoutId: Int!
        defaultDirListLayoutId: Int!
        defaultDirEntryLayoutId: Int!
    }

    input ColourThemeInput {
        hex: String
        alpha: Int
    }
`;
