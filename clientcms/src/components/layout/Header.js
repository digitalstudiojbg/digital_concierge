import React, { Component } from "react";
import {
    COLOR_JBG_PURPLE,
    SYSTEM_CMS_INDEX_URL,
    // TOUCHSCREEN_CMS_INDEX_URL,
    LOGIN_URL,
    PORTAL_URL
} from "../../utils/Constants";
import { withRouter } from "react-router";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
// import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import { logout } from "../../auth/auth";
import HomeIcon from "@material-ui/icons/HomeOutlined";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: "rgb(154,166,174)"
    },
    avatar: {
        margin: 10
    },
    icon: {
        marginRight: -5
    },
    homeIcon: {
        marginRight: 10
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

const WelcomeDiv = styled.div`
    width: 350px;
    margin-left: 1.5vw;
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

    handleNavigateToPortalCMS = () => {
        window.location.replace(PORTAL_URL);
    };

    render() {
        const { client, match, classes } = this.props;
        const { getCurrentUser: user } = client.readQuery({
            query
        });
        //Calculate percentage of the user div and title div after a fixed size sidebar div of 350px
        const availableWidth = window.innerWidth - 350;
        const userDivWidth = availableWidth * 0.35;

        const { name = "" /*has_tablet = false, has_touchscreen = false*/ } =
            user.venue || {};

        const {
            client: { name: clientName = "" }
        } = user;

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <ContainerDiv>
                {match.url === URL_WELCOME ? (
                    <WelcomeDiv>Welcome</WelcomeDiv>
                ) : (
                    <div
                        style={{
                            width: 260,
                            fontSize: "2em",
                            // paddingLeft: 30,
                            fontWeight: 700,
                            textAlign: "center"
                        }}
                    >
                        {/* {has_tablet && has_touchscreen && (
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
                        )} */}
                        PLATYPUS
                    </div>
                )}
                <div
                    style={{
                        flex: 1
                    }}
                >
                    {match.url !== URL_WELCOME && (
                        <React.Fragment>
                            <div>{name.toUpperCase()}</div>
                            <div style={{ color: "black" }}>
                                {match.url.includes(SYSTEM_CMS_INDEX_URL)
                                    ? "DIGITAL COMPENDIUM"
                                    : "TOUCHSCREEN"}
                            </div>
                        </React.Fragment>
                    )}
                </div>
                <div
                    style={{
                        width: `${userDivWidth}px`,
                        marginRight: "1.5vw"
                    }}
                >
                    <WelcomeUserDetailContainerDiv>
                        {clientName.toUpperCase() === "JOHN BATMAN GROUP" && (
                            <HomeIcon
                                className={classes.homeIcon}
                                onClick={this.handleNavigateToPortalCMS}
                            />
                        )}
                        <div
                            style={{
                                paddingLeft: "1vw",
                                // paddingRight: "1vw",
                                borderLeft: "2px solid white"
                            }}
                        >
                            <p style={{}}>{user.name}</p>
                        </div>
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
                        {user.venue && user.venue.logo && (
                            <img
                                style={{
                                    height: "50px"
                                }}
                                src={user.venue.logo}
                                alt={`{user.name}_avatar`}
                            />
                        )}
                    </WelcomeUserDetailContainerDiv>
                </div>
            </ContainerDiv>
        );
    }
}

export default withApollo(withRouter(withStyles(styles)(Header)));
