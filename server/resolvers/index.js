import user_resolver from "./user";
import role_resolver from "./role";
import permission_resolver from "./permission";
import validation_resolver from "./validation";
import client_resolver from "./client";
import device_resolver from "./device";
import directoryEntry_resolver from "./directoryEntry";
import directoryList_resolver from "./directoryList";
import gallery_resolver from "./gallery";
import department_resolver from "./department";
import guest_resolver from "./guest";
import home_resolver from "./home";
import jbgDirectoryEntry_resolver from "./jbgDirectoryEntry";
import jbgDirectoryList_resolver from "./jbgDirectoryList";
import jbgMap_resolver from "./jbgMap";
import jbgWelcome_resolver from "./jbgWelcome";
import justBrilliantGuide_resolver from "./justBrilliantGuide";
import layout_resolver from "./layout";
import map_resolver from "./map";
import media_resolver from "./media";
import room_resolver from "./room";
import start_resolver from "./start";
import system_resolver from "./system";
import template_resolver from "./template";
import activityLog_resolver from "./activityLog";
import file_resolver from "./file";
import json_resolver from "./json_resolver";
import contact_resolver from "./contact";
import contract_resolver from "./contract";
import url_resolver from "./url_resolver";
import email_resolver from "./email_resolver";
import dateTime_resolver from "./datetime_resolver";
import country_resolver from "./country";
import state_resolver from "./state";
import theme_resolver from "./theme";
import deviceType_resolver from "./deviceType";
import systemType_resolver from "./systemType";
import permissionCategory_resolver from "./permissionCategory";

export default [
    user_resolver,
    role_resolver,
    client_resolver,
    device_resolver,
    directoryEntry_resolver,
    directoryList_resolver,
    gallery_resolver,
    department_resolver,
    guest_resolver,
    home_resolver,
    jbgDirectoryEntry_resolver,
    jbgDirectoryList_resolver,
    jbgMap_resolver,
    jbgWelcome_resolver,
    justBrilliantGuide_resolver,
    layout_resolver,
    map_resolver,
    media_resolver,
    room_resolver,
    system_resolver,
    start_resolver,
    template_resolver,
    permission_resolver,
    validation_resolver,
    activityLog_resolver,
    json_resolver,
    contract_resolver,
    contact_resolver,
    url_resolver,
    email_resolver,
    dateTime_resolver,
    file_resolver,
    country_resolver,
    state_resolver,
    theme_resolver,
    deviceType_resolver,
    systemType_resolver,
    permissionCategory_resolver
];
