import { gql } from "apollo-server-express";

export default gql`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type FileResult {
        filename: String!
        location: String!
    }

    extend type Query {
        uploads: [File]
    }

    extend type Mutation {
        uploadFile(file: Upload!): FileResult
        uploadFiles(files: [Upload!]!): [FileResult!]!
    }
`;
