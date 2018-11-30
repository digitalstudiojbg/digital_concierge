import user_resolver from "./user";
import roler_resolver from "./role";
import datetime_resolver from "./datetime";
import permission_resolver from "./permission";
import venue_resolver from "./venue";
import tb_category_resolver from "./tb_category";
import validation_resolver from "./validation";
import tb_directory_type_resolver from "./tb_directory_type";
import tb_directory_resolver from "./tb_directory";

export default [
    user_resolver,
    roler_resolver,
    datetime_resolver,
    permission_resolver,
    venue_resolver,
    tb_category_resolver,
    validation_resolver,
    tb_directory_type_resolver,
    tb_directory_resolver
];
