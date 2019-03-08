import gql from "graphql-tag";

export const directoryListFragment = gql`
    fragment directoryListDetail on DirectoryList {
        id
        name
        is_root
        active
        layout {
            id
            name
            layout_family {
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
            media {
                id
                name
                path
                type
            }
        }
    }
`;
