import gql from "graphql-tag";

export const themeDetailFragment = gql`
    fragment themeDetail on Theme {
        id
        companyLogoURL
        headerFont
        subHeaderFont
        bodyFont
        captionFont
        colours
        defaultStartLayoutId
        defaultStartLayout {
            id
            name
            layout_family {
                id
                name
            }
        }
        defaultHomeLayoutId
        defaultHomeLayout {
            id
            name
            layout_family {
                id
                name
            }
        }
        defaultDirListLayoutId
        defaultDirListLayout {
            id
            name
            layout_family {
                id
                name
            }
        }
        defaultDirEntryLayoutId
        defaultDirEntryLayout {
            id
            name
            layout_family {
                id
                name
            }
        }
    }
`;
