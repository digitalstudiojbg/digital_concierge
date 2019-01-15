import { gql } from "apollo-server-express";

export default gql`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    extend type Query {
        uploads: [File]
    }
    extend type Mutation {
        uploadFile(file: Upload!): File!
        uploadFiles(files: [Upload!]!): [File!]!
    }
`;
