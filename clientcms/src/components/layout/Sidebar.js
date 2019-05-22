import React, { Component } from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import {
    WELCOME_URL,
    SYSTEM_CMS_INDEX_URL,
    SYSTEM_CMS_LANDINGPAGE_URL,
    SYSTEM_MODIFY_START_URL,
    SYSTEM_MODIFY_HOME_URL,
    SYSTEM_CMS_HOME_URL,
    // TOUCHSCREEN_CMS_INDEX_URL,
    SYSTEM_CMS_CONTENT_URL,
    SYSTEM_CMS_SETTINGS_URL,
    SYSTEM_CMS_CREATE_CONTENT_INDEX_URL,
    SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL,
    SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL,
    SYSTEM_CMS_PROMOTION,
    SYSTEM_CMS_LIBRARY,
    // SYSTEM_CMS_DEVICES,
    SYSTEM_CMS_GUESTS,
    SYSTEM_CMS_ACTIVITY,
    SYSTEM_CMS_REPORTS,
    SYSTEM_CMS_STAFF,
    SYSTEM_MODIFY_DIRECTORY_LIST_URL,
    SYSTEM_MODIFY_DIRECTORY_ENTRY_URL
} from "../../utils/Constants";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import Home from "@material-ui/icons/Home";
import Dashboard from "@material-ui/icons/Dashboard";
import Stars from "@material-ui/icons/Stars";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import List from "@material-ui/icons/List";
import ImageOutlined from "@material-ui/icons/ImageOutlined";
import LocalMoviesOutlined from "@material-ui/icons/LocalMoviesOutlined";
import NotificationsActiveOutlined from "@material-ui/icons/NotificationsActiveOutlined";
import GroupOutlined from "@material-ui/icons/GroupOutlined";
import ShowChartOutlined from "@material-ui/icons/ShowChartOutlined";
import People from "@material-ui/icons/People";
import Loading from "../loading/Loading";
import { getSystemDetailSidebar } from "../../data/query";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const SIDEBAR_ITEMS = [
    {
        name:
            process.env.NODE_ENV === "production"
                ? "http://digitalconcierge-env.uir8vfstfw.ap-southeast-2.elasticbeanstalk.com/tablet/"
                : "http://localhost:5000",
        displayName: "View System",
        icon: Visibility,
        paddingLeft: "20px"
    },
    {
        name: WELCOME_URL,
        displayName: "Home",
        icon: Home,
        paddingLeft: "20px"
    },
    {
        name: SYSTEM_CMS_INDEX_URL,
        displayName: "Dashboard",
        icon: Dashboard,
        paddingLeft: "20px"
    },
    {
        name: SYSTEM_CMS_ACTIVITY,
        displayName: "Activity",
        icon: NotificationsActiveOutlined,
        paddingLeft: "20px"
    },
    {
        name: SYSTEM_CMS_GUESTS,
        displayName: "Guests",
        icon: People,
        paddingLeft: "20px"
    },
    {
        name: "expandContent",
        displayName: "System Content",
        icon: List,
        paddingLeft: "20px",
        expandItems: [
            {
                name: SYSTEM_MODIFY_START_URL,
                displayName: "Start",
                icon: Stars,
                paddingLeft: "20px"
            },
            {
                name: SYSTEM_MODIFY_HOME_URL,
                displayName: "Home",
                icon: BookmarkBorder,
                paddingLeft: "20px"
            },
            {
                name: SYSTEM_CMS_CONTENT_URL,
                displayName: "Directories",
                icon: List,
                paddingLeft: "20px"
            },
            {
                name: SYSTEM_CMS_PROMOTION,
                displayName: "Promotions",
                icon: ImageOutlined,
                paddingLeft: "20px"
            },
            {
                name: SYSTEM_CMS_LIBRARY,
                displayName: "Library",
                icon: LocalMoviesOutlined,
                paddingLeft: "20px"
            }
        ]
    },
    {
        name: SYSTEM_CMS_REPORTS,
        displayName: "Reports",
        icon: ShowChartOutlined,
        paddingLeft: "20px"
    },
    {
        name: SYSTEM_CMS_STAFF,
        displayName: "Staff",
        icon: GroupOutlined,
        paddingLeft: "20px"
    }
    // {
    //     name: SYSTEM_CMS_DEVICES,
    //     displayName: "Devices",
    //     icon: TabletMac
    // },
    // {
    //     name: SYSTEM_CMS_SETTINGS_URL,
    //     displayName: "Settings",
    //     icon: Settings
    // }
];

const SidebarContainer = styled.div``;

const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    padding-left: ${props => props.paddingLeft};
    height: 60px;
    transition: all 0.3s linear;
    width:100%;

  background-color: ${({ selectedItem, expectedItem }) =>
      selectedItem === expectedItem && "rgb(43,43,43)"}; 
    

    color: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && "rgb(234,234,234)"};

    &:hover {
        background-color: white;
        color: black;
    }

    background-image: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem &&
        "linear-gradient(to bottom,rgb(43,43,43) 0%, rgb(43,43,43) 100%),linear-gradient(to bottom, rgb(0,0,0) 0%, rgb(0,0,0) 100%)"};
 

    background-clip: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && " content-box , padding-box"};
   
 /* justify-content: ${props => (props.center ? "center" : "stretch")}; */
`;

const SidebarLabel = styled.div`
    font-size: 18px;
    /* font-weight: 700; */
    padding-left: 10px;
    padding-top: 0x;
    padding-bottom: 0px;
`;

const ClientAvatarDiv = styled.div`
    height: 90%;

    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
`;

const styles = {
    icon: {
        width: 30,
        height: 30,
        paddingLeft: 10
    }
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        const { history, match } = this.props;
        const { params } = match || {};
        const { system_id = "" } = params || {};

        let urlPath;
        let expandContent = false;
        if (history) {
            switch (this.props.history.location.pathname) {
                // case SYSTEM_CMS_INDEX_URL:
                //     urlPath = SYSTEM_CMS_INDEX_URL;
                //     break;
                case SYSTEM_CMS_INDEX_URL.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_INDEX_URL;
                    break;
                case SYSTEM_CMS_HOME_URL.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_HOME_URL;
                    expandContent = true;
                    break;
                case SYSTEM_CMS_CONTENT_URL.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    expandContent = true;
                    break;
                case SYSTEM_CMS_LANDINGPAGE_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_LANDINGPAGE_URL;
                    expandContent = true;
                    break;
                case SYSTEM_CMS_SETTINGS_URL.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_SETTINGS_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_INDEX_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_CREATE_CONTENT_INDEX_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_CATEGORY_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_SUBCATEGORY_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_CREATE_CONTENT_DIRECTORY_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    break;
                case SYSTEM_CMS_PROMOTION.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_PROMOTION;
                    expandContent = true;
                    break;
                case SYSTEM_CMS_LIBRARY.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_LIBRARY;
                    expandContent = true;
                    break;
                case SYSTEM_CMS_GUESTS.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_GUESTS;
                    break;
                case SYSTEM_CMS_ACTIVITY.replace(":system_id", system_id):
                    urlPath = SYSTEM_CMS_ACTIVITY;
                    break;
                case SYSTEM_MODIFY_DIRECTORY_LIST_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    expandContent = true;
                    break;
                case SYSTEM_MODIFY_DIRECTORY_ENTRY_URL.replace(
                    ":system_id",
                    system_id
                ):
                    urlPath = SYSTEM_CMS_CONTENT_URL;
                    expandContent = true;
                    break;
                case SYSTEM_MODIFY_START_URL.replace(":system_id", system_id):
                    urlPath = SYSTEM_MODIFY_START_URL;
                    expandContent = true;
                    break;
                case SYSTEM_MODIFY_HOME_URL.replace(":system_id", system_id):
                    urlPath = SYSTEM_MODIFY_HOME_URL;
                    expandContent = true;
                    break;
                default:
                    urlPath = SYSTEM_CMS_INDEX_URL;
            }
        }
        this.state = {
            //   open: true,
            selectedItem: urlPath,
            expandContent
        };
    }
    // handleClick = () => {
    //     this.setState(state => ({ open: !state.open }));
    // };

    render() {
        const { selectedItem } = this.state;
        const { classes, match } = this.props;
        const { params } = match || {};
        const { system_id = "" } = params || {};
        return (
            <Query variables={{ id: system_id }} query={getSystemDetailSidebar}>
                {({ loading, error, data: { system } }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error message:\n${error.message}`;
                    console.log(system);
                    return (
                        <div
                            style={{
                                //   display: "flex",

                                flexDirection: "column",
                                //   flexWrap: "nowrap",
                                // justifyContent: "flex-start",
                                //  alignItems: "stretch",
                                alignContent: "stretch",
                                width: "260px",
                                backgroundColor: "rgb(71,70,71)",
                                color: "rgb(223,223,223)"

                                //  height: "100%"
                            }}
                        >
                            {Boolean(system) &&
                                Boolean(system.client) &&
                                Boolean(system.client.avatar) && (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "15%",
                                            backgroundColor: "white",
                                            paddingTop: "5%"
                                        }}
                                    >
                                        <ClientAvatarDiv
                                            imageUrl={system.client.avatar}
                                        />
                                    </div>
                                )}
                            <div
                                style={{
                                    backgroundColor: "rgba(49, 49, 49, 1)",
                                    // padding: "10 0 10 30",
                                    width: "100%",
                                    //   display: "flex",
                                    alignItems: "center",
                                    fontSize: "18px",
                                    padding: " 10px 30px"
                                    // overflowY: "scroll"
                                }}
                            >
                                <p>{system.name}</p>
                            </div>
                            {SIDEBAR_ITEMS.map((items, index) => {
                                const {
                                    name,
                                    displayName,
                                    icon: EntryIcon,
                                    paddingLeft,
                                    expandItems = []
                                } = items;
                                return (
                                    name &&
                                    displayName && (
                                        <SidebarContainer
                                            style={{
                                                //overflowY: "scroll",
                                                backgroundColor: "rgb(71,70,71)"
                                            }}
                                        >
                                            <React.Fragment key={index}>
                                                {/* <span
                                                    style={{
                                                        position: "relative",
                                                        height: "100%",
                                                        width: "10%",
                                                        backgroundColor: "red"
                                                    }}
                                                /> */}
                                                <SidebarItem
                                                    onClick={() => {
                                                        // console.log("Name is ", name);
                                                        if (
                                                            name === WELCOME_URL
                                                        ) {
                                                            const navigateTo =
                                                                WELCOME_URL +
                                                                "/" +
                                                                system.client
                                                                    .id +
                                                                "/systems";
                                                            this.props.history.push(
                                                                navigateTo
                                                            );
                                                        } else if (
                                                            name.includes(
                                                                "expand"
                                                            )
                                                        ) {
                                                            //Do not navigate if expand
                                                            this.setState({
                                                                [name]: !this
                                                                    .state[name]
                                                            });
                                                        } else {
                                                            this.setState({
                                                                selectedItem: name
                                                            });
                                                            displayName ===
                                                            "View Site"
                                                                ? window.open(
                                                                      name,
                                                                      "_blank"
                                                                  )
                                                                : name &&
                                                                  this.props.history.push(
                                                                      name.replace(
                                                                          ":system_id",
                                                                          system.id
                                                                      )
                                                                  );
                                                        }
                                                    }}
                                                    selectedItem={selectedItem}
                                                    expectedItem={name}
                                                    paddingLeft={paddingLeft}
                                                >
                                                    {Boolean(EntryIcon) && (
                                                        <EntryIcon
                                                            className={
                                                                classes.icon
                                                            }
                                                        />
                                                    )}

                                                    <SidebarLabel>
                                                        {displayName}
                                                    </SidebarLabel>
                                                </SidebarItem>
                                                {name.includes("expand") &&
                                                    this.state[name] &&
                                                    Array.isArray(
                                                        expandItems
                                                    ) &&
                                                    expandItems.length > 0 && (
                                                        <React.Fragment>
                                                            {expandItems.map(
                                                                (
                                                                    eItem,
                                                                    eIndex
                                                                ) => {
                                                                    const {
                                                                        name: eName,
                                                                        displayName: eDisplayName,
                                                                        icon: EEntryIcon,
                                                                        paddingLeft: ePaddingLeft
                                                                    } = eItem;
                                                                    return (
                                                                        <SidebarItem
                                                                            key={`${index}-${eIndex}`}
                                                                            onClick={() => {
                                                                                // console.log("Name is ", name);

                                                                                this.setState(
                                                                                    {
                                                                                        selectedItem: eName
                                                                                    }
                                                                                );
                                                                                this.props.history.push(
                                                                                    eName.replace(
                                                                                        ":system_id",
                                                                                        system.id
                                                                                    )
                                                                                );
                                                                            }}
                                                                            selectedItem={
                                                                                selectedItem
                                                                            }
                                                                            expectedItem={
                                                                                eName
                                                                            }
                                                                            paddingLeft={
                                                                                ePaddingLeft
                                                                            }
                                                                        >
                                                                            {Boolean(
                                                                                EEntryIcon
                                                                            ) && (
                                                                                <EEntryIcon
                                                                                    className={
                                                                                        classes.icon
                                                                                    }
                                                                                    style={{
                                                                                        marginLeft:
                                                                                            "30px"
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            <SidebarLabel>
                                                                                {
                                                                                    eDisplayName
                                                                                }
                                                                            </SidebarLabel>
                                                                        </SidebarItem>
                                                                    );
                                                                }
                                                            )}
                                                        </React.Fragment>
                                                    )}
                                            </React.Fragment>
                                        </SidebarContainer>
                                    )
                                );
                            })}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(withRouter(withStyles(styles)(Sidebar)));
