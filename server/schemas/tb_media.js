import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        tb_media(id: ID!): TB_MEDIA
        tb_medias: [TB_MEDIA]
    }

    type TB_MEDIA {
        id: ID!
        type: String
        path: String
        venue: Venue
        #tb_directories: [TB_Directory]
        #tb_landing_pages: [TB_LANDING_PAGE]
        #tb_categories: [TB_Category]
        ad_directories: [AD_Directory]
        ad_categories: [AD_Category]
    }
`;
