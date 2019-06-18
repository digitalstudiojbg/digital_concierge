import React, { Component } from "react";
import {
    COLOR_JBG_PURPLE,
    SYSTEM_CMS_INDEX_URL,
    TOUCHSCREEN_CMS_INDEX_URL,
    LOGIN_URL,
    CREATE_NEW_CLIENT
} from "../../utils/Constants";
import { withRouter } from "react-router";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MessageIcon from "@material-ui/icons/MessageOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import { logout } from "../../auth/auth";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 0.1,
        padding: 0,
        color: "rgb(154,166,174)"
    },
    avatar: {
        margin: 10
    },
    icon: {
        marginRight: -5
    },
    iconMargin: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    iconNoMargin: {
        width: 30,
        height: 30
    },
    personIcon: {
        width: 40,
        height: 40
    }
});

const ContainerDiv = styled.div`
    width: 100vw;
    height: 80px;
    position: fixed;
    top: 0px;
    /* background-color: ${COLOR_JBG_PURPLE}; */
    background-color: black;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    font-size: 1.2em;
    z-index: 1;
`;

const WelcomeDiv = styled.h2`
    // width: 350px;
    // background-color: rgb(191, 191, 191);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    font-weight: bold;
    color: white;
    margin: 0;
    padding-left: 100px;
`;

const WelcomeUserDetailContainerDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

const URL_WELCOME = "/welcome";

class Header extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.setState({ anchorEl: null });
        logout();
        this.props.history.push(LOGIN_URL);
    };

    render() {
        const { client, match, classes } = this.props;
        const { getCurrentUser: user } = client.readQuery({
            query
        });
        //Calculate percentage of the user div and title div after a fixed size sidebar div of 350px
        // const availableWidth = window.innerWidth - 350;
        // const userDivWidth = availableWidth * 0.35;

        const { has_tablet = false, has_touchscreen = false, name = "" } =
            user.venue || {};

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <ContainerDiv>
                {match.url === URL_WELCOME ||
                match.url === CREATE_NEW_CLIENT ? (
                    <WelcomeDiv>PLATYPUS</WelcomeDiv>
                ) : (
                    <div style={{ width: 350 }}>
                        {has_tablet && has_touchscreen && (
                            <Link
                                to={
                                    match.url.includes(SYSTEM_CMS_INDEX_URL)
                                        ? TOUCHSCREEN_CMS_INDEX_URL
                                        : SYSTEM_CMS_INDEX_URL
                                }
                                style={{
                                    color: "white",
                                    textDecoration: "none"
                                }}
                            >
                                <IconButton className={classes.button}>
                                    <ArrowLeftIcon />
                                </IconButton>
                                SWITCH SITE
                            </Link>
                        )}
                    </div>
                )}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <div style={{ width: "60%" }}>
                        {/* {match.url !== URL_WELCOME && (
                            <React.Fragment>
                                <div>{name.toUpperCase()}</div>
                                <div>
                                    {match.url.includes(SYSTEM_CMS_INDEX_URL)
                                        ? "DIGITAL COMPENDIUM"
                                        : "TOUCHSCREEN"}
                                </div>
                            </React.Fragment>
                        )} */}
                        {match.url === CREATE_NEW_CLIENT && (
                            <h2
                                style={{
                                    // height: "100%",
                                    display: "flex",
                                    margin: 0,
                                    alignItems: "center",
                                    paddingLeft: 20,
                                    color: "rgb(52, 255, 163)",
                                    fontSize: "42px",
                                    fontWeight: "bold"
                                }}
                            >
                                PORTAL
                            </h2>
                        )}
                    </div>
                    <div
                        style={{
                            width: "40%",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginRight: "20px"
                        }}
                    >
                        <HomeIcon className={classes.iconMargin} />
                        <MessageIcon className={classes.iconMargin} />
                        <EmailIcon className={classes.iconMargin} />
                        <NotificationIcon className={classes.iconNoMargin} />
                    </div>
                </div>
                <div
                    style={{
                        // width: `${userDivWidth}px`,
                        marginRight: "1.5vw"
                    }}
                >
                    <WelcomeUserDetailContainerDiv>
                        <div
                            style={{
                                paddingLeft: "1vw",
                                // paddingRight: "1vw",
                                borderLeft: "2px solid white"
                            }}
                        >
                            <p>{user.name}</p>
                        </div>
                        <PersonIcon className={classes.personIcon} />
                        <IconButton
                            className={classes.button}
                            onClick={this.handleClick}
                        >
                            <ArrowDownIcon />
                        </IconButton>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>
                                <ListItemIcon className={classes.icon}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="PROFILE" />
                            </MenuItem>
                            <MenuItem onClick={this.handleLogout}>
                                <ListItemIcon className={classes.icon}>
                                    <PowerIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="LOGOUT" />
                            </MenuItem>
                        </Menu>
                        {/* {user.avatar && (
                            <img
                                style={{
                                    height: "50px"
                                }}
                                src={user.avatar}
                                alt={`{user.name}_avatar`}
                            />
                        )} */}
                    </WelcomeUserDetailContainerDiv>
                </div>
            </ContainerDiv>
        );
    }
}

export default withApollo(withRouter(withStyles(styles)(Header)));
