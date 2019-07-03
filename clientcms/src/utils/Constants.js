import styled from "styled-components";
import FileSaver from "file-saver";

export const COLOR_JBG_PURPLE = "#272b67";
export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";

export const PORTAL_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/cms"
        : "http://localhost:4000";

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
export const SYSTEM_CMS_CONTENT_INDEX = SYSTEM_INDEX_URL + "/content_index";
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
export const SYSTEM_MODIFY_START_URL =
    SYSTEM_INDEX_URL + "/content/modify_start";
export const SYSTEM_MODIFY_HOME_URL = SYSTEM_INDEX_URL + "/content/modify_home";
export const SYSTEM_CMS_LIBRARY = SYSTEM_INDEX_URL + "/library";
export const SYSTEM_CMS_PROMOTION = SYSTEM_INDEX_URL + "/promotion";
export const SYSTEM_CMS_DEVICES = SYSTEM_INDEX_URL + "/devices";
export const SYSTEM_CMS_GUESTS = SYSTEM_INDEX_URL + "/guests";
export const SYSTEM_CMS_ACTIVITY = SYSTEM_INDEX_URL + "/activity";
export const SYSTEM_CMS_REPORTS = SYSTEM_INDEX_URL + "/reports";
export const SYSTEM_CMS_STAFF = SYSTEM_INDEX_URL + "/staff";

export const TOUCHSCREEN_CMS_INDEX_URL = "/touchscreen_cms";

//USER URL Constants
export const USER_EDIT_URL = "/user/:user_id";
export const USER_CREATE_URL = "/user/new";

export const MAX_FILE_SIZE = 104857600; //100MB in bytes

export const SORT_BY_ORDER_BY_OPTIONS = [
    {
        text: "Date created order (new to old)",
        value: 0,
        actualValue: { sortBy: "createdAt", orderBy: "DESC" }
    },
    {
        text: "Date created order (old to new)",
        value: 1,
        actualValue: { sortBy: "createdAt", orderBy: "ASC" }
    },
    {
        text: "Alphabetical order (A-Z)",
        value: 2,
        actualValue: { sortBy: "title_plaintext", orderBy: "ASC" }
    },
    {
        text: "Alphabetical order (Z-A)",
        value: 3,
        actualValue: { sortBy: "title_plaintext", orderBy: "DESC" }
    }
];

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    /* background-color: rgb(246, 246, 246); */
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    color: rgb(67, 66, 93);
`;

export const CreateContentContainerDiv = styled.div`
    /* background-color: white; */
    color: rgb(113, 116, 152);
    width: 100%;
    height: 90%;
    /* border: 2px solid rgb(186, 185, 206);
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px; */
    font-size: 1.9em;
`;

//Helper recursive function to recursively modify the data received from GraphQL but this time with "HOME" as the root directory list
//Modification includes:
//-Adding depth attribute
//-Adding is_dir_list attribute to differentiate directory list and directory entries
//-Adding hash_id attribute for directory entries (many to many relationship between directory entry and directory list, for better differentiation)
//The hash_id is a string formatted like this: ${GRANDPARENT_DIRECTORY_LIST_ID}-${PARENT_DIRECTORY_LIST_ID}-${CHILD_DIRECTORY_LIST_ID}-${DIRECTORY_ENTRY_ID}
function _modifyDirectoryListOrEntryWithHome(
    entry,
    depth = 1,
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
                is_root: false,
                depth,
                [child_directory_lists_key]: [...children]
            };
        } else {
            return {
                ...entry,
                is_dir_list: true,
                is_root: false,
                depth,
                [directory_entries_key]: [...children]
            };
        }
    } else {
        const is_dir_list = Boolean(entry[directory_entries_key]);
        if (is_dir_list) {
            return { ...entry, is_dir_list, depth, is_root: false };
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
export const modifyDirectoryListData = (
    data,
    withHome = true,
    child_directory_lists_key = "child_directory_lists"
) => {
    if (data.length === 0) {
        return [];
    } else {
        if (withHome) {
            const children = data.map(item => {
                return _modifyDirectoryListOrEntryWithHome(item);
            });
            return [
                {
                    id: "-1",
                    name: "HOME",
                    is_root: true,
                    active: true,
                    depth: 0,
                    is_dir_list: true,
                    [child_directory_lists_key]: children
                }
            ];
        } else {
            return data.map(item => _modifyDirectoryListOrEntry(item));
        }
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

//https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
export const chunkArray = (myArray, chunk_size) => {
    let tempArray = [];
    for (let index = 0; index < myArray.length; index += chunk_size) {
        const myChunk = myArray.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray = [...tempArray, myChunk];
    }

    return tempArray;
};

//https://stackoverflow.com/a/5624139
export const hexToRgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
};
