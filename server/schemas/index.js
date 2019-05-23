import { gql } from "apollo-server-express";
import custom_scalar from "./customScalar";
import user_schema from "./user";
import role_schema from "./role";
import permission_schema from "./permission";
import client_schema from "./client";
import validation_schema from "./validation";
import file_schema from "./file";
import department_schema from "./department";
import guest_schema from "./guest";
import guestRooms_schema from "./guestRooms";
import room_schema from "./room";
import media_schema from "./media";
import system_schema from "./system";
import device_schema from "./device";
import justBrilliantGuide_schema from "./justBrilliantGuide";
import layout_schema from "./layout";
import start_schema from "./start";
import home_schema from "./home";
import gallery_schema from "./gallery";
import map_schema from "./map";
import directoryList_schema from "./directoryList";
import directoryEntry_schema from "./directoryEntry";
import jbgWelcome_schema from "./jbgWelcome";
import jbgMap_schema from "./jbgMap";
import jbgDirectoryList_schema from "./jbgDirectoryList";
import jbgDirectoryEntry_schema from "./jbgDirectoryEntry";
import template_schema from "./template";
import activityLog_schema from "./activityLog";
import contact_schema from "./contact";
import contract_schema from "./contract";
import country_schema from "./country";
import state_schema from "./state";
import theme_schema from "./theme";
import currency_schema from "./currency";
import deviceType_schema from "./deviceType";
import systemType_schema from "./systemType";
import permissionCategory_schema from "./permissionCategory";
import featureCategory_schema from "./featureCategory";
import feature_schema from "./feature";
import payment_schema from "./payment";
import licenseType_schema from "./licenseType";
import license_schema from "./license";
import layoutFamily_schema from "./layoutFamily";
import layoutType_schema from "./layoutType";
import templateType_schema from "./templateType";
import palette_schema from "./palette";

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
    custom_scalar,
    user_schema,
    role_schema,
    permission_schema,
    client_schema,
    department_schema,
    validation_schema,
    guest_schema,
    room_schema,
    guestRooms_schema,
    media_schema,
    system_schema,
    device_schema,
    justBrilliantGuide_schema,
    layout_schema,
    start_schema,
    home_schema,
    gallery_schema,
    map_schema,
    directoryList_schema,
    directoryEntry_schema,
    jbgWelcome_schema,
    jbgMap_schema,
    jbgDirectoryList_schema,
    jbgDirectoryEntry_schema,
    template_schema,
    activityLog_schema,
    contact_schema,
    contract_schema,
    file_schema,
    country_schema,
    state_schema,
    theme_schema,
    currency_schema,
    deviceType_schema,
    systemType_schema,
    permissionCategory_schema,
    featureCategory_schema,
    feature_schema,
    payment_schema,
    licenseType_schema,
    license_schema,
    layoutFamily_schema,
    layoutType_schema,
    templateType_schema,
    palette_schema
];
