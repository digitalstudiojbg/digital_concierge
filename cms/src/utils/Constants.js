import React from "react";
import styled from "styled-components";
import FileSaver from "file-saver";
import Slide from "@material-ui/core/Slide";
import dayJs from "dayjs";
import TabletMockUp from "../images/TabletImageTest.jpg";

export const COLOR_JBG_PURPLE = "#272b67";
export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";

export const PORTAL_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com/cms"
        : "http://localhost:4000";

export const CLIENT_CMS_URL =
    process.env.NODE_ENV === "production"
        ? "http://platypus-env.bxpjxuug9t.ap-southeast-2.elasticbeanstalk.com"
        : "http://localhost:9000";

export const DECIMAL_RADIX = 10;

//URL Constants
export const LOGIN_URL = "/login";
export const WELCOME_URL = "/main";
export const WELCOME_URL_CLIENT = "/welcome";
export const WELCOME_URL_ROUTER = "/main/:which";
export const CREATE_NEW_CLIENT = "/create_new_client";

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

//Guides URL
export const GUIDE_MAIN_URL = "/guide/:pub_id";
export const GUIDE_CREATE_NEW_URL = "/guide/new";

//Advertisers URL
export const ADVERTISER_MAIN_URL = "/edit/advertiser/:advertiser_id";
export const ADVERTISER_CREATE_NEW_URL = "/create/advertiser";

//Articles URL
export const ARTICLE_MAIN_URL = "/edit/article/:article_id/publication/:pub_id";
export const ARTICLE_CREATE_NEW_URL = "/create/article/publication/:pub_id";

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
    return data.map(item => {
        return _modifyDirectoryListOrEntry(item);
    });
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

export const LayoutImageDiv = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
`;

export const SlideUpTransition = props => {
    return <Slide direction="up" {...props} />;
};

export const digitsOnly = value => new RegExp("/^d+$/").test(value);

export const generatePeriodMonthList = (maxMonth, minMonth = 1) => {
    let currentMonth = minMonth;
    let output = [];
    if (maxMonth > minMonth) {
        output = Array(maxMonth - minMonth + 1).fill({});
        return output.map(_ => {
            const temp = {
                id: currentMonth,
                name: `${currentMonth} ${currentMonth > 1 ? "Months" : "Month"}`
            };
            currentMonth += 1;
            return temp;
        });
    }
    return output;
};

export const sortDate = (date1, date2) => {
    if (dayJs(date1).isBefore(dayJs(date2))) {
        //date1 is less than date2 by some ordering criterion
        return -1;
    } else if (dayJs(date1).isAfter(dayJs(date2))) {
        //date1 is greater than date2 by the ordering criterion
        return 1;
    } else {
        return 0;
    }
};

export const renderTabletMockUp = () => (
    <div
        style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url('${TabletMockUp}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: "white"
        }}
    />
);

export const defaultFamilyKeyNameFromTemplateName = name => {
    const temp = name.split(" ")[0].toLowerCase();
    const items = {
        welcome: "welcomeFamilyId",
        home: "home",
        featured: "featureFamilyId",
        information: "informationFamilyId",
        map: "mapFamilyId",
        gallery: "galleryFamilyId",
        markets: "marketFamilyId",
        food: "foodFamilyId",
        attractions: "attractionFamilyId",
        calendar: "eventFamilyId",
        essential: "essentialFamilyId"
    };
    return items[temp];
};

//http://stackoverflow.com/questions/5836833/create-a-array-with-random-values-in-javascript
export function shuffle(array) {
    let tmp,
        current,
        top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}

export function randomiseItems(array) {
    //Optimised version
    return shuffle(Array.from(array.keys())).map(item => array[item]);
}
