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
    }
`;
