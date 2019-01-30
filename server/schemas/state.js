import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        state(id: ID!): State
        states: [State]
    }

    type State {
        id: ID!
        name: String
        country: Country
        venue_clients: [Client]
        postal_clients: [Client]
    }
`;
