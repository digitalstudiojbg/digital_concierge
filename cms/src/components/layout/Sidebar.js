import React, { Component } from "react";
import styled from "styled-components";
import {
    WELCOME_URL,
    SYSTEM_CMS_INDEX_URL,
    TABLET_CMS_HOME_URL,
    SYSTEM_CMS_LANDINGPAGE_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    SYSTEM_CMS_CONTENT_URL,
    SYSTEM_CMS_SETTINGS_URL,
    SYSTEM_CMS_CREATE_CONTENT_INDEX_URL,
    SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL
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
        name: SYSTEM_CMS_INDEX_URL,
        displayName: "Dashboard"
    },
    {
        name: SYSTEM_CMS_LANDINGPAGE_URL,
        displayName: "Landing Page"
    },
    {
        name: SYSTEM_CMS_CONTENT_URL,
        displayName: "Content"
    },

    {
        name: SYSTEM_CMS_SETTINGS_URL,
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
                case SYSTEM_CMS_INDEX_URL:
                    urlPath = SYSTEM_CMS_INDEX_URL;
                    break;
                case SYSTEM_CMS_INDEX_URL:
                    urlPath = SYSTEM_CMS_INDEX_URL;
                    break;
                case SYSTEM_CMS_CONTENT_URL:
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_LANDINGPAGE_URL:
                    urlPath = SYSTEM_CMS_LANDINGPAGE_URL;
                    break;
                case SYSTEM_CMS_SETTINGS_URL:
                    urlPath = SYSTEM_CMS_SETTINGS_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_INDEX_URL:
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL:
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL:
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL:
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                default:
                    urlPath = SYSTEM_CMS_INDEX_URL;
            }
        }

        this.state = {
            selectedItem: urlPath,
            system_id: null
        };
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { system_id } = params;
        this.setState({
            system_id
        });
    }

    componentDidUpdate(prevProps) {
        const { match = {} } = this.props;
        if (prevProps.match !== match) {
            const { params = {} } = match;
            const { system_id } = params;
            this.setState({
                system_id
            });
        }
    }

    render() {
        const { selectedItem, system_id } = this.state;
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
                                        : name &&
                                          this.props.history.push(
                                              name.replace(
                                                  ":system_id",
                                                  system_id
                                              )
                                          );
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
