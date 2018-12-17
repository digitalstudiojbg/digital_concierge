import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        system(id: ID!): System
        systems: [System]
    }

    type System {
        id: ID!
        name: String
        venue: [Venue]
    }
`;
