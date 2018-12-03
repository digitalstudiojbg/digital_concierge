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