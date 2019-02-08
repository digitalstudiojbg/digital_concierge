import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        system(id: ID!): System
        systems: [System]
        systemsByClient(id: ID!): [System]
        systemsByUser: [System]
    }

    type System {
        id: ID!
        name: String
        aif: Boolean
        numberOfDevices: Int
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        devices: [Device]
        just_brilliant_guide: JustBrilliantGuide
        layouts: [Layout]
        start: Start
        home: Home
        galleries: [Gallery]
        maps: [Map]
        directory_lists: [DirectoryList]
        media: [Media]
        theme: Theme
        device_type: DeviceType
        system_type: SystemType
    }
`;
