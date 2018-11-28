export const COLOR_JBG_PURPLE = "#272b67";
export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/api"
        : "http://localhost:3000";

//URL Constants
export const LOGIN_URL = "/login";
export const WELCOME_URL = "/welcome";

export const TABLET_CMS_INDEX_URL= "/tablet_cms";
export const TABLET_CMS_HOME_URL = "/tablet_cms/home";
export const TABLET_CMS_LIST_URL = "/tablet_cms/list";

export const TOUCHSCREEN_CMS_INDEX_URL = "/touchscreen_cms";