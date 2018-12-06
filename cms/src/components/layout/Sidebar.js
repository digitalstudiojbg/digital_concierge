import React, { Component } from "react";
import styled from "styled-components";
import {
    WELCOME_URL,
    TABLET_CMS_INDEX_URL,
    TABLET_CMS_HOME_URL,
    TABLET_CMS_LANDINGPAGE_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    TABLET_CMS_CONTENT_URL,
    TABLET_CMS_SETTINGS_URL,
    TABLET_CMS_CREATE_CONTENT_INDEX_URL,
    TABLET_CMS_CREATE_CONTENT_CATEGORY_URL,
    TABLET_CMS_CREATE_CONTENT_SUBCATEGORY_URL,
    TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL
} from "../../utils/Constants";

const SIDEBAR_ITEMS = [
    {
        name:
            process.env.NODE_ENV === "production"
                ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/tablet/"
                : "http://localhost:5000",
        displayName: "View Site"
    },

    {
        name: TABLET_CMS_INDEX_URL,
        displayName: "Dashboard"
    },
    {
        name: TABLET_CMS_LANDINGPAGE_URL,
        displayName: "Landing Page"
    },
    {
        name: TABLET_CMS_CONTENT_URL,
        displayName: "Content"
    },
    
    {
        name: TABLET_CMS_SETTINGS_URL,
        displayName: "Settings"
    }
];

const SidebarItem = styled.div`
    height: 70px;
    line-height: 70px;
    padding-left: 30px;
    transition: all 0.3s linear;

    background-color: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && "white"};
    color: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && "black"};

    &:hover {
        background-color: white;
        color: black;
    }
`;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        const { history } = this.props;
        let urlPath;
        if (history) {
            switch (this.props.history.location.pathname) {
                case TABLET_CMS_INDEX_URL:
                    urlPath = TABLET_CMS_INDEX_URL;
                    break;
                case TABLET_CMS_INDEX_URL:
                    urlPath = TABLET_CMS_INDEX_URL;
                    break;
                case TABLET_CMS_CONTENT_URL:
                    urlPath = TABLET_CMS_CONTENT_URL;
                    break;
                case TABLET_CMS_LANDINGPAGE_URL:
                    urlPath = TABLET_CMS_LANDINGPAGE_URL;
                    break;
                case TABLET_CMS_SETTINGS_URL:
                    urlPath = TABLET_CMS_SETTINGS_URL;
                    break;
                case TABLET_CMS_CREATE_CONTENT_INDEX_URL:
                    urlPath = TABLET_CMS_CONTENT_URL;
                    break;
                case TABLET_CMS_CREATE_CONTENT_CATEGORY_URL:
                    urlPath = TABLET_CMS_CONTENT_URL;
                    break;
                case TABLET_CMS_CREATE_CONTENT_SUBCATEGORY_URL:
                    urlPath = TABLET_CMS_CONTENT_URL;
                    break;
                case TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL:
                    urlPath = TABLET_CMS_CONTENT_URL;
                    break;
                default:
                    urlPath = TABLET_CMS_INDEX_URL;
            }
        }

        this.state = {
            selectedItem: urlPath
        };
    }

    render() {
        const { selectedItem } = this.state;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    alignContent: "stretch",
                    width: "350px",
                    backgroundColor: "rgb(70,73,124)",
                    color: "white",
                    height: "calc(100vh-80px)"
                }}
            >
                {SIDEBAR_ITEMS.map((items, index) => {
                    const { name, displayName, tablet } = items;
                    return (
                        name &&
                        displayName && (
                            <SidebarItem
                                key={index}
                                onClick={() => {
                                    this.setState({ selectedItem: name });
                                    displayName === "View Site"
                                        ? window.open(name, "_blank")
                                        : name && this.props.history.push(name);
                                }}
                                selectedItem={selectedItem}
                                expectedItem={name}
                            >
                                <h1>{displayName}</h1>
                            </SidebarItem>
                        )
                    );
                })}
            </div>
        );
    }
}

export default Sidebar;
