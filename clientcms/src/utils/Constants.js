import styled from "styled-components";
import FileSaver from "file-saver";

export const COLOR_JBG_PURPLE = "#272b67";
export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";

export const DECIMAL_RADIX = 10;

//URL Constants
export const LOGIN_URL = "/login";
export const WELCOME_URL = "/welcome";
export const CREATE_NEW_CLIENT = "/welcome/new_client";

export const SYSTEM_INDEX_URL = "/system/:system_id";
export const SYSTEM_CMS_INDEX_URL = SYSTEM_INDEX_URL + "/cms";
export const SYSTEM_CMS_HOME_URL = SYSTEM_INDEX_URL + "/home";
export const SYSTEM_CMS_LANDINGPAGE_URL = SYSTEM_INDEX_URL + "/landingpage";
export const SYSTEM_CMS_CONTENT_URL = SYSTEM_INDEX_URL + "/content";
export const SYSTEM_CMS_SETTINGS_URL = SYSTEM_INDEX_URL + "/settings";
export const SYSTEM_CMS_CREATE_CONTENT_INDEX_URL =
    SYSTEM_INDEX_URL + "/content/create";
export const SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL =
    SYSTEM_INDEX_URL + "/content/create/category";
export const SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL =
    SYSTEM_INDEX_URL + "/content/create/subcategory";
export const SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL =
    SYSTEM_INDEX_URL + "/content/create/directory";
export const SYSTEM_MODIFY_DIRECTORY_LIST_URL =
    SYSTEM_INDEX_URL + "/content/modify_directory_list";
export const SYSTEM_MODIFY_DIRECTORY_ENTRY_URL =
    SYSTEM_INDEX_URL + "/content/modify_directory_entry";
export const SYSTEM_CMS_LIBRARY = SYSTEM_INDEX_URL + "/library";
export const SYSTEM_CMS_PROMOTION = SYSTEM_INDEX_URL + "/promotion";
export const SYSTEM_CMS_DEVICES = SYSTEM_INDEX_URL + "/devices";
export const SYSTEM_CMS_GUESTS = SYSTEM_INDEX_URL + "/guests";
export const SYSTEM_CMS_ACTIVITY = SYSTEM_INDEX_URL + "/activity";

export const TOUCHSCREEN_CMS_INDEX_URL = "/touchscreen_cms";

export const MAX_FILE_SIZE = 104857600; //100MB in bytes

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: rgb(246, 246, 246);
    padding-left: 20px;
    padding-top: 20px;
    color: rgb(113, 116, 152);
`;

export const CreateContentContainerDiv = styled.div`
    background-color: white;
    color: rgb(113, 116, 152);
    width: 70%;
    border: 2px solid rgb(186, 185, 206);
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    font-size: 1.9em;
    display: flex;
`;

//Helper recursive function to recursively modify the data received from GraphQL
//Modification includes:
//-Adding depth attribute
//-Adding is_dir_list attribute to differentiate directory list and directory entries
//-Adding hash_id attribute for directory entries (many to many relationship between directory entry and directory list, for better differentiation)
//The hash_id is a string formatted like this: ${GRANDPARENT_DIRECTORY_LIST_ID}-${PARENT_DIRECTORY_LIST_ID}-${CHILD_DIRECTORY_LIST_ID}-${DIRECTORY_ENTRY_ID}
function _modifyDirectoryListOrEntry(
    entry,
    depth = 0,
    key = "",
    child_directory_lists_key = "child_directory_lists",
    directory_entries_key = "directory_entries"
) {
    if (
        (Boolean(entry[child_directory_lists_key]) &&
            entry[child_directory_lists_key].length > 0) ||
        (Boolean(entry[directory_entries_key]) &&
            entry[directory_entries_key].length > 0)
    ) {
        //Recur if item has more child categories or directory entries
        const has_child_directories =
            Boolean(entry[child_directory_lists_key]) &&
            entry[child_directory_lists_key].length > 0;
        const toLoop = has_child_directories
            ? entry[child_directory_lists_key]
            : entry[directory_entries_key];
        let children = [];
        toLoop.forEach(item => {
            children = [
                ...children,
                _modifyDirectoryListOrEntry(
                    item,
                    depth + 1,
                    `${key}${entry.id}-`
                )
            ];
        });
        if (has_child_directories) {
            //Different attribute naming for directory entries and child categories
            return {
                ...entry,
                is_dir_list: true,
                depth,
                [child_directory_lists_key]: [...children]
            };
        } else {
            return {
                ...entry,
                is_dir_list: true,
                depth,
                [directory_entries_key]: [...children]
            };
        }
    } else {
        const is_dir_list = Boolean(entry[directory_entries_key]);
        if (is_dir_list) {
            return { ...entry, is_dir_list, depth };
        } else {
            return {
                ...entry,
                is_dir_list,
                depth,
                hash_id: `${key}${entry.id}`
            };
        }
    }
}

//Function to modify category and directory entries data
export const modifyDirectoryListData = data => {
    if (data.length === 0) {
        return [];
    } else {
        return data.map(item => {
            return _modifyDirectoryListOrEntry(item);
        });
    }
};

//https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
export const getAllUniqueItems = itemList => {
    let seen = {};
    return itemList.filter(item => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
};

export const formatBytes = (a, b) => {
    if (0 === a) return "0 Bytes";
    var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
};

export const downloadFile = (link, fileName) => {
    /*  fetch(link, {
        mode: "no-cors"
    })
        .then(res => res.blob())
        .then(blob => FileSaver.saveAs(blob, fileName));*/

    FileSaver.saveAs(link, fileName);
};

export const bytesToKb = size => size / 1024;

//https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
export const HEX_COLOUR_REGEX = /^#[0-9A-F]{6}$/i;
