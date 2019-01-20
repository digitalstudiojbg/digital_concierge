import { gql } from "apollo-server-express";
import user_schema from "./user";
import role_schema from "./role";
import permission_schema from "./permission";
import client_schema from "./client";
import validation_schema from "./validation";
import file_schema from "./file";
import group_schema from "./group";
import guest_schema from "./guest";
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
import content_schema from "./content";

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
    client_schema,
    group_schema,
    validation_schema,
    guest_schema,
    room_schema,
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
    file_schema,
    content_schema
];
