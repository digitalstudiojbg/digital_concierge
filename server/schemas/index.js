import { gql } from "apollo-server-express";
import userSchema from "./user";
import roleSchema from "./role";
import permissionSchema from "./permission";
import venueSchema from "./venue";

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [
    linkSchema,
    userSchema,
    roleSchema,
    permissionSchema,
    venueSchema
];
