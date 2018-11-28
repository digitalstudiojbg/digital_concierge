import React, { Component } from "react";
import { COLOR_JBG_PURPLE, TABLET_CMS_INDEX_URL, TOUCHSCREEN_CMS_INDEX_URL } from "../../utils/Constants";
import { withRouter } from "react-router";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from 'styled-components';
import IconButton from "@material-ui/core/IconButton";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      color: "rgb(154,166,174)"
    },
    avatar: {
        margin: 10,
    },
});

const ContainerDiv = styled.div`
    width: 100vw;
    height: 80px;
    position: fixed;
    top: 0px;
    background-color: ${COLOR_JBG_PURPLE};
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
    render() {
        const { client, match, classes } = this.props;
        const { getCurrentUser: user } = client.readQuery({
            query
        });
        //Calculate percentage of the user div and title div after a fixed size sidebar div of 350px
        const availableWidth = window.innerWidth - 350;
        const titleDivWidth = availableWidth * 0.65;
        const userDivWidth = availableWidth - titleDivWidth;

        const { has_tablet = false, has_touchscreen = false, name = "" } = user.venue || {};

        return (
            <ContainerDiv>
                {match.url === URL_WELCOME 
                ? (
                    <WelcomeDiv>Welcome</WelcomeDiv> 
                ) : (
                    <div style={{ width: 350 }}>
                        {has_tablet && has_touchscreen && (
                            <Link to={
                                match.url.includes(TABLET_CMS_INDEX_URL) ? TOUCHSCREEN_CMS_INDEX_URL : TABLET_CMS_INDEX_URL
                            } style={{color: "white", textDecoration: "none"}}>
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
                        width: `${titleDivWidth}px`
                    }}
                >
                    {match.url !== URL_WELCOME && (
                        <React.Fragment>
                            <div>{name.toUpperCase()}</div>
                            <div>
                                {match.url.includes(TABLET_CMS_INDEX_URL) ? "DIGITAL COMPENDIUM" : "TOUCHSCREEN"}
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
                        <div
                            style={{
                                paddingLeft: "1vw",
                                // paddingRight: "1vw",
                                borderLeft: "2px solid white"
                            }}
                        >
                            <p style={{}}>{user.name}</p>
                        </div>
                        <IconButton className={classes.button}>
                            <ArrowDownIcon />
                        </IconButton>
                        <Avatar alt="user-avatar" src={user.venue.logo} className={classes.avatar} />
                    </WelcomeUserDetailContainerDiv>
                </div>
            </ContainerDiv>
        );
    }
}

export default withApollo(withRouter(withStyles(styles)(Header)));