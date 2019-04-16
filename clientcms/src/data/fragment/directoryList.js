import gql from "graphql-tag";

export const directoryListFragment = gql`
    fragment directoryListDetail on DirectoryList {
        id
        name
        title
        title_plaintext
        description
        order
        is_root
        active
        colours
        sortBy
        orderBy
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
            title
            title_plaintext
            description
            order
            active
            colours
            media {
                id
                name
                path
                type
            }
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
        }
    }
`;
