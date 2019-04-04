import gql from "graphql-tag";

export const directoryListFragment = gql`
    fragment directoryListDetail on DirectoryList {
        id
        name
        title
        description
        order
        is_root
        active
        colours
        layout {
            id
            name
            layout_family {
                id
                name
            }
        }
        template {
            id
            name
            validations {
                id
                name
            }
        }
        media {
            id
            name
            path
            type
        }
        directory_entries {
            id
            name
            active
            colours
            media {
                id
                name
                path
                type
            }
        }
    }
`;
