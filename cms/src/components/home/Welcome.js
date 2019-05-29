import React, { Component, Fragment, lazy, Suspense } from "react";
import "./Welcome.css";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
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

const SidebarHeaderTitle = styled.div`
    width: 100%;
    font-weight: 700;
    color: rgb(52, 255, 163);
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
`;

const SidebarSelected = styled.div`
    width: 100%;
    background: rgb(113, 113, 113);
    color: white;
    font-weight: 700;
    padding: 20px;
    text-align: center;
    font-size: 1.5em;
`;

const SidebarNormal = styled.div`
    width: 100%;
    background: white;
    color: black;
    font-weight: 700;
    padding: 20px;
    text-align: center;
    font-size: 1.5em;
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

// const WelcomeSystems = lazy(() => import("./WelcomeSystems"));
const WelcomeAccount = lazy(() => import("./WelcomeAccount"));
const WelcomeDashboard = lazy(() => import("./WelcomeDashboard"));
const WelcomeClients = lazy(() => import("./WelcomeClients"));
const AllGuestsPage = lazy(() => import("../../pages/guests/AllGuestsPage"));

class Welcome extends Component {
    sidebarButtons = [
        { id: "dashboard", name: "DASHBOARD", component: WelcomeDashboard },
        // { id: "systems", name: "SYSTEMS", component: WelcomeSystems },
        { id: "clients", name: "CLIENTS", component: WelcomeClients },
        { id: "account", name: "ACCOUNT", component: WelcomeAccount },
        { id: "guests", name: "GUESTS", component: AllGuestsPage },
        // { id: "theme", name: "THEME SETTINGS", component: WelcomeSystems },
        // { id: "users", name: "USERS & ROLES", component: WelcomeSystems },
        // { id: "support", name: "SUPPORT", component: WelcomeSystems }
    ];
    state = {
        selected: "dashboard"
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
                    // <Button
                    //     id={id}
                    //     size="large"
                    //     key={id}
                    //     className={
                    //         selected === id
                    //             ? classes.sidebarButtonSelected
                    //             : classes.sidebarButtonNormal
                    //     }
                    //     onClick={this.clickSidebarButton.bind(this, id)}
                    // >
                    //     {name}
                    // </Button>
                    <Fragment key={id}>
                        {selected === id ? (
                            <SidebarSelected
                                onClick={this.clickSidebarButton.bind(this, id)}
                            >
                                {name}
                            </SidebarSelected>
                        ) : (
                            <SidebarNormal
                                onClick={this.clickSidebarButton.bind(this, id)}
                            >
                                {name}
                            </SidebarNormal>
                        )}
                    </Fragment>
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
                    <SidebarHeaderTitle>
                        <span style={{ fontSize: "4em", paddingRight: 5 }}>
                            PORTAL
                        </span>
                        <span style={{ fontSize: "1.5em" }}>
                            <div>ADMIN</div>
                            <div>CONSOLE</div>
                        </span>
                    </SidebarHeaderTitle>
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
