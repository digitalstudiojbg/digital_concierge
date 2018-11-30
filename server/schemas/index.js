import { gql } from "apollo-server-express";
import userSchema from "./user";
import roleSchema from "./role";
import permissionSchema from "./permission";
import venueSchema from "./venue";
import tb_categorySchema from "./tb_category";
import validationSchema from "./validation";
import tb_directory_typeSchema from "./tb_directory_type";

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
    venueSchema,
    tb_categorySchema,
    validationSchema,
    tb_directory_typeSchema
];
