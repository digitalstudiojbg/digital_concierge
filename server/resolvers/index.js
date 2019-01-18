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
import file_resolver from "./file";

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
    file_resolver
];
