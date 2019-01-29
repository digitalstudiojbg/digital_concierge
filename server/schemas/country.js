import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        country(id: ID!): Country
        countries: [Country]
    }

    type Country {
        id: ID!
        name: String
        states: [State]
    }
`;
