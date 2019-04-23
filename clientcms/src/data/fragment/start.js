import gql from "graphql-tag";

export const startDetailFragment = gql`
    fragment startDetail on Start {
        id
        description
        button_text
        header {
            id
            name
            path
            type
        }
        logo {
            id
            name
            path
            type
        }
        template {
            id
            name
        }
        layout {
            id
            name
        }
        colours
    }
`;
