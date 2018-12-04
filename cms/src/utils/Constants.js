import styled from 'styled-components';

export const COLOR_JBG_PURPLE = "#272b67";
export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";

//URL Constants
export const LOGIN_URL = "/login";
export const WELCOME_URL = "/welcome";

export const TABLET_CMS_INDEX_URL = "/tablet_cms";
export const TABLET_CMS_HOME_URL = "/tablet_cms/home";
export const TABLET_CMS_LANDINGPAGE_URL = "/tablet_cms/landingpage";
export const TABLET_CMS_CONTENT_URL = "/tablet_cms/content";
export const TABLET_CMS_SETTINGS_URL = "/tablet_cms/settings";

export const TOUCHSCREEN_CMS_INDEX_URL = "/touchscreen_cms";

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: rgb(246,246,246);
    padding-left: 20px;
    padding-top: 20px;
`;

//Helper recursive function to recursively modify the data received from GraphQL
//Modification includes:
//-Adding depth attribute 
//-Adding is_category attribute to differentiate categories and directory
//-Adding hash_id attribute for directory entries (many to many relationship between directory and category, for better differentiation)
//The hash_id is a string formatted like this: ${GRANDPARENT_CATEGORY_ID}-${PARENT_CATEGORY_ID}-${CHILD_CATEGORY_ID}-${DIRECTORY_ID}
function _modifyCategoryOrDirectory(category, depth = 0, key = "") {
    if (
        (Boolean(category.child_category) && category.child_category.length > 0) ||
        (Boolean(category.tb_directories) && category.tb_directories.length > 0)
    ) {
        //Recur if item has more child categories or directory entries
        const has_child_categories = Boolean(category.child_category) && category.child_category.length > 0;
        const toLoop = has_child_categories ? category.child_category : category.tb_directories;
        let children = [];
        toLoop.forEach(item => {
            children = [...children, _modifyCategoryOrDirectory(item, depth + 1, `${key}${category.id}-`)];
        });
        if (has_child_categories) { //Different attribute naming for directory entries and child categories
            return { ...category, is_category: true, depth, child_category: [...children] };
        } else {
            return { ...category, is_category: true, depth, tb_directories: [...children] };
        }
    } else {
        const is_category = Boolean(category.tb_directories);
        if (is_category) {
            return { ...category, is_category, depth};
        } else {
            return { 
                ...category, 
                is_category, 
                depth,
                hash_id: `${key}${category.id}`
            };
        }
    }
};

//Function to modify category and directory entries data
export const modifyCategoryDirectoryData = (data) => {
    return data.map(item => {
        return _modifyCategoryOrDirectory(item);
    });
};