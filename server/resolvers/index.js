import userResolver from "./user";
import roleResolver from "./role";
import datetimeResolver from "./datetime";
import permissionResolver from "./permission";
import venueResolver from "./venue";
import tb_categoryResolver from "./tb_category";
import validationResolver from "./validation";
import tb_directory_typeResolver from "./tb_directory_type";

export default [
    userResolver,
    roleResolver,
    datetimeResolver,
    permissionResolver,
    venueResolver,
    tb_categoryResolver,
    validationResolver,
    tb_directory_typeResolver
];
