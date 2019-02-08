import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        deviceType(id: ID!): DeviceType
        deviceTypes: [DeviceType]
    }

    type DeviceType {
        id: ID!
        name: String
        createdAt: DateTime
        updatedAt: DateTime
        systems: [System]
    }
`;
