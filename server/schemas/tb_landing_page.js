import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_landing_page(id: ID!): TB_LANDING_PAGE
        tb_landing_pages: [TB_LANDING_PAGE]
        tb_landing_pages_by_venue(id: ID!): [TB_LANDING_PAGE]
    }

    type TB_LANDING_PAGE {
        id: ID!
        header_logo: String
        header_text: String
        body_image: String
        button: String
        bg_color: String
        tb_directory_type: TB_Directory_Type
        venue: Venue
        tb_media: [TB_MEDIA]
    }
`;
