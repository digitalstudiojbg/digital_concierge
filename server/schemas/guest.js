import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        guest(id: ID!): Guest
        guests: [Guest]
    }

    type Guest {
        id: ID!
        firstname: String
        lastname: String
        email: EmailAddress
        createdAt: DateTime
        updatedAt: DateTime
        client: Client
        rooms: [Room]
    }
`;
