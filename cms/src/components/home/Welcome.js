import React, { Component, Fragment, lazy, Suspense } from "react";
import "./Welcome.css";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// import { Query } from "react-apollo";
// import { gql } from "apollo-boost";

// const CURRENT_SYSTEM = gql`
//     {
//         currentSystem @client
//     }
// `;

const ContainerDiv = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    position: relative;
    display: flex;
`;

const SidebarDiv = styled.div`
    width: 350px;
    background-color: rgb(252, 252, 252);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentDiv = styled.div`
    width: calc(100vw - 350px);
`;

const styles = () => ({
    sidebarButtonSelected: {
        background: "rgb(113, 113, 113)",
        color: "white",
        fontWeight: 700,
        borderRadius: 10,
        marginTop: 20
    },
    sidebarButtonNormal: {
        background: "white",
        color: "black",
        fontWeight: 700,
        borderRadius: 10,
        marginTop: 20
    }
});

const WelcomeSystems = lazy(() => import("./WelcomeSystems"));
const WelcomeAccount = lazy(() => import("./WelcomeAccount"));
const WelcomeDashboard = lazy(() => import("./WelcomeDashboard"));

class Welcome extends Component {
    sidebarButtons = [
        { id: "dashboard", name: "DASHBOARD", component: WelcomeDashboard },
        { id: "systems", name: "SYSTEMS", component: WelcomeSystems },
        { id: "account", name: "ACCOUNT", component: WelcomeAccount },
        { id: "theme", name: "THEME SETTINGS", component: WelcomeSystems },
        { id: "users", name: "USERS & ROLES", component: WelcomeSystems },
        { id: "support", name: "SUPPORT", component: WelcomeSystems }
    ];
    state = {
        selected: "systems"
    };

    clickSidebarButton(selected) {
        this.setState({ selected });
    }

    renderSidebarButtons() {
        const { selected } = this.state;
        const { classes } = this.props;
        return (
            <Fragment>
                {this.sidebarButtons.map(({ id, name }) => (
                    <Button
                        id={id}
                        size="large"
                        key={id}
                        className={
                            selected === id
                                ? classes.sidebarButtonSelected
                                : classes.sidebarButtonNormal
                        }
                        onClick={this.clickSidebarButton.bind(this, id)}
                    >
                        {name}
                    </Button>
                ))}
            </Fragment>
        );
    }

    render() {
        const { selected } = this.state;
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });
        const { component: SelectedComponent } = this.sidebarButtons.find(
            ({ id }) => id === selected
        );

        return (
            <ContainerDiv>
                <SidebarDiv>
                    {user.client && user.client.avatar && (
                        <img
                            src={user.client.avatar}
                            style={{
                                marginTop: "5vh",
                                width: "50%",
                                marginBottom: "5vh"
                            }}
                            alt={`${user.client.name} avatar`}
                        />
                    )}
                    <p style={{ fontWeight: "700", fontSize: "2em" }}>
                        ADMIN CONSOLE
                    </p>
                    {this.renderSidebarButtons()}
                </SidebarDiv>
                <ContentDiv>
                    <Suspense>
                        <SelectedComponent />
                    </Suspense>
                    {/* WELCOME PAGE
                    {user.client.systems.map(system => {
                        return (
                            <h3
                                key={system.id}
                                onClick={() => {
                                    client.writeData({
                                        data: { currentSystem: system.name }
                                    });
                                    history.push(`/system/${system.id}`);
                                }}
                            >
                                {system.id} {system.name}
                            </h3>
                        );
                    })}
                    <Query query={CURRENT_SYSTEM}>
                        {({ data }, client) => {
                            const { currentSystem } = data;
                            return currentSystem ? (
                                <h1>Current System:{currentSystem} </h1>
                            ) : (
                                <h1>Current System: No System For You</h1>
                            );
                        }}
                    </Query> */}
                </ContentDiv>
            </ContainerDiv>
        );
    }
}

export default withApollo(withStyles(styles)(Welcome));
