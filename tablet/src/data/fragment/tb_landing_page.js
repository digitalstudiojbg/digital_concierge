import gql from "graphql-tag";

export const landingPageDetailFragment = gql`
    fragment landingPageDetail on TB_LANDING_PAGE {
        id
        header_logo
        header_text
        body_image
        button
        bg_color
        tb_directory_type {
            name
        }
    }
`;
