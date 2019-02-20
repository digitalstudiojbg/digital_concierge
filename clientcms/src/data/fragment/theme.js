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
        defaultHomeLayoutId
        defaultDirListLayoutId
        defaultDirEntryLayoutId
    }
`;
