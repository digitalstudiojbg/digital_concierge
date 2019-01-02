import { gql } from "apollo-server-express";
import user_schema from "./user";
import role_schema from "./role";
import permission_schema from "./permission";
// import venue_schema from "./venue";
// import tb_category_schema from "./tb_category";
import validation_schema from "./validation";
// import tb_directory_type_schema from "./tb_directory_type";
// import tb_directory_schema from "./tb_directory";
// import tb_landing_page_schema from "./tb_landing_page";
// import global_setting_schema from "./global_setting";
// import ad_directory_type_schema from "./ad_directory_type";
// import ad_directory_schema from "./ad_directory";
// import ad_category_schema from "./ad_category";
// import tb_media_schema from "./tb_media";
import file_schema from "./file";

const link_schema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [
    link_schema,
    user_schema,
    role_schema,
    permission_schema,
    // venue_schema,
    // tb_category_schema,
    validation_schema,
    // tb_directory_type_schema,
    // tb_directory_schema,
    // tb_landing_page_schema,
    // global_setting_schema,
    // ad_directory_type_schema,
    // ad_directory_schema,
    // ad_category_schema,
    // tb_media_schema,
    file_schema
];
