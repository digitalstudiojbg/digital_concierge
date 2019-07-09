import gql from "graphql-tag";

export const CREATE_DEPARTMENT = gql`
    mutation createDepartment($input: CreateDepartmentInput) {
        createDepartment(input: $input) {
            id
            name
            roles {
                id
                name
            }
        }
    }
`;
