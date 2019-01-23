import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        activityLog(id: ID!): ActivityLog
        activityLogs: [ActivityLog]
    }

    extend type Mutation {
        createActivity(input: ActivityLogInput): ActivityLog
    }

    scalar JSON

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
        user: User
    }

    input ActivityLogInput {
        tableName: String!
        modelName: String!
        subjectId: Int!
        actionType: String
        properties: String
    }
`;
