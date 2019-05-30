import React, { Component, Fragment, lazy, Suspense } from "react";
import "./Welcome.css";
import { getCurrentUserQuery as query } from "../../data/query";
import {compose, withApollo} from "react-apollo";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Route } from "react-router-dom";
import ROUTES from "../../utils/routes";
import { WELCOME_URL } from "../../utils/Constants";
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
    display: flex;
    overflow: auto;
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

const WelcomeNavButton = ({ content, onClick, isSelected }) => (
    isSelected ? (
        <SidebarSelected onClick={onClick}>
            {content}
        </SidebarSelected>
    ) : (
        <SidebarNormal onClick={onClick}>
            {content}
        </SidebarNormal>
    )
);

// const WelcomeSystems = lazy(() => import("./WelcomeSystems"));
const WelcomeAccount = lazy(() => import("./WelcomeAccount"));
const WelcomeDashboard = lazy(() => import("./WelcomeDashboard"));
const WelcomeClients = lazy(() => import("./WelcomeClients"));
const Guests = lazy(() => import("../guests"));
// const AllGuestsPage = lazy(() => import("../../pages/guests/AllGuestsPage"));

class Welcome extends Component {
    sidebarButtons = [
        { id: "dashboard", name: "DASHBOARD", component: WelcomeDashboard },
        // { id: "systems", name: "SYSTEMS", component: WelcomeSystems },
        { id: "clients", name: "CLIENTS", component: WelcomeClients },
        { id: "account", name: "ACCOUNT", component: WelcomeAccount },
        // { id: "guests", name: "GUESTS", component: Guests },
        // { id: "theme", name: "THEME SETTINGS", component: WelcomeSystems },
        // { id: "users", name: "USERS & ROLES", component: WelcomeSystems },
        // { id: "support", name: "SUPPORT", component: WelcomeSystems }
    ];

    isSelectedGuestsPage = () => {
        const { pathname } = this.props.location;
        return pathname === ROUTES.guests;
    };

    state = {
        selected: this.isSelectedGuestsPage() ? null : "dashboard"
    };

    clickSidebarButton(selected) {
        const { history: { push } } = this.props;

        push(WELCOME_URL);

        this.setState({ selected });
    }

    renderSidebarButtons() {
        const { selected } = this.state;
        const { history: { push } } = this.props;

        const GuestBtn = (
            <WelcomeNavButton
                key={"guests"}
                content="GUESTS"
                isSelected={this.isSelectedGuestsPage()}
                onClick={() => push(ROUTES.guests)}
            />
        );

        const result = this.sidebarButtons.map(
            ({ id, name }) => (
                <WelcomeNavButton
                    key={id}
                    isSelected={selected === id}
                    content={name}
                    onClick={() => this.clickSidebarButton(id)}
                />
            )
        );

        result.push(GuestBtn);

        return result;
    }

    render() {
        const { selected } = this.state;
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

        const isSelectedGuestsPage = this.isSelectedGuestsPage();
        const SelectedComponent = !isSelectedGuestsPage
            ? this.sidebarButtons.find(({ id }) => id === selected).component
            : null;

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
                        {
                            SelectedComponent && <SelectedComponent />
                        }

                        <Route
                            path={ROUTES.guests}
                            component={Guests}
                        />
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

export default compose(
    withApollo,
    withStyles(styles),
    withRouter,
)(Welcome);
