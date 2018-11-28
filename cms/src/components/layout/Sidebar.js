import React, { Component } from "react";
import styled from "styled-components";
import {
    WELCOME_URL,
    TABLET_CMS_INDEX_URL,
    TABLET_CMS_HOME_URL,
    TABLET_CMS_LANDINGPAGE_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    TABLET_CMS_CONTENT_URL,
    TABLET_CMS_SETTINGS_URL
} from "../../utils/Constants";

const SIDEBAR_ITEMS = [
    {
        name: "VIEW_SITE",
        displayName: "View Site",
        link: TABLET_CMS_INDEX_URL
    },
    {
        name: "DASHBOARD",
        displayName: "Dashboard",
        link: TABLET_CMS_INDEX_URL
    },
    {
        name: "LANDING_PAGE",
        displayName: "Landing Page",
        link: TABLET_CMS_LANDINGPAGE_URL
    },
    {
        name: "CONTENT",
        displayName: "Content",
        link: TABLET_CMS_CONTENT_URL
    },
    {
        name: "SETTINGS",
        displayName: "Settings",
        link: TABLET_CMS_SETTINGS_URL
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
    state = {
        selectedItem: "123"
    };

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
                    const { name, displayName, link } = items;
                    return (
                        name &&
                        displayName && (
                            <SidebarItem
                                key={index}
                                onClick={() => {
                                    this.setState({ selectedItem: name });
                                    link && this.props.history.push(link);
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
