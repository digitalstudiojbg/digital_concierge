import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        activityLog(id: ID!): ActivityLog
        activityLogs: [ActivityLog]
    }

    extend type Mutation {
        createActivity(input: ActivityLogInput): ActivityLog
    }

    type ActivityLog {
        id: ID!
        tableName: String
        modelName: String
        subjectId: Int
        actionType: String
        properties_raw: String
        properties: JSON
        ip: String
        country: String
        region: String
        city: String
        latitude: String
        longitude: String
        createdAt: DateTime
        updatedAt: DateTime
        username: String
        email: EmailAddress
    }

    input ActivityLogInput {
        tableName: String!
        modelName: String!
        subjectId: Int!
        actionType: String
        properties: String
    }
`;
