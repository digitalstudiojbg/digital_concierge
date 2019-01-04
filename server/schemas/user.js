import { gql } from "apollo-server-express";

export default gql`
    scalar DateTime

    extend type Query {
        getCurrentUser: User
        user(id: ID!): User
        users: [User]
    }

    type User {
        id: ID!
        name: String
        email: String
        password: String
        active: Boolean
        role: Role
        client: Client
        avatar: String
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
