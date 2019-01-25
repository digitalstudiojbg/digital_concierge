import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getCurrentUser: User
        user(id: ID!): User
        users: [User]
    }

    type User {
        id: ID!
        name: String
        email: EmailAddress
        # password: String
        active: Boolean
        roles: [Role]
        client: Client
        avatar: URL
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
