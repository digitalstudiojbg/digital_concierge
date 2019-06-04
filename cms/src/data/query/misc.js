import gql from "graphql-tag";

export const getTabbedPageComplete = gql`
    {
        tabbed_page_complete @client
    }
`;
