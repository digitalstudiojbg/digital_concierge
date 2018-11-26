import db from "../models";
import { GraphQLScalarType } from "graphql"; // ES6

export default {
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "DateTime type",
        parseValue(value) {
            // value from the client
            return new Date(value);
        },
        serialize(value) {
            const date = new Date(value);
            // value sent to the client
            return date.toISOString();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // ast value is always in string format
                return parseInt(ast.value, 10);
            }
            return null;
        }
    })
};
