import user_resolver from "./user";
import roler_resolver from "./role";
import datetime_resolver from "./datetime";
import permission_resolver from "./permission";
import venue_resolver from "./venue";
import validation_resolver from "./validation";
import global_setting_resolver from "./global_setting";
import ad_directory_type_resolver from "./ad_directory_type";
import ad_directory_resolver from "./ad_directory";
import ad_category_resolver from "./ad_category";
import tb_media_resolver from "./tb_media";
import file_resolver from "./file";
import content_layout from "./content_layout";
import system_layout from "./system";
import guest_layout from "./guest";
import tier_layout from "./tier";

export default [
    user_resolver,
    roler_resolver,
    datetime_resolver,
    permission_resolver,
    venue_resolver,
    validation_resolver,
    global_setting_resolver,
    ad_directory_type_resolver,
    ad_directory_resolver,
    ad_category_resolver,
    tb_media_resolver,
    file_resolver,
    content_layout,
    system_layout,
    guest_layout,
    tier_layout
];
