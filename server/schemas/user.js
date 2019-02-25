import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getCurrentUser: User
        user(id: ID!): User
        users: [User]
    }

    extend type Mutation {
        createUser(input: CreateUserInput): User
        updateUser(input: UpdateUserInput): User
        deleteUsers(input: DeleteUserInput): [User]
    }

    type User {
        id: ID!
        name: String
        email: EmailAddress
        # password: String
        active: Boolean
        first_phone_number: String
        second_phone_number: String
        position: String
        roles: [Role]
        client: Client
        avatar: URL
        createdAt: DateTime
        updatedAt: DateTime
    }

    input CreateUserInput {
        name: String!
        email: EmailAddress!
        password: String
        first_phone_number: String
        second_phone_number: String
        position: String
        # mediumId: Int
        clientId: Int
        roleId: Int
    }

    input UpdateUserInput {
        id: Int!
        name: String!
        position: String!
        email: EmailAddress!
        first_phone_number: String
        second_phone_number: String
        password: String
    }

    input DeleteUserInput {
        id: [ID!]!
    }
`;
