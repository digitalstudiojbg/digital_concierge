import gql from "graphql-tag";

export const homeDetailFragment = gql`
    fragment homeDetail on Home {
        id
        description
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
            layout_family {
                id
                name
            }
        }
        colours
    }
`;
