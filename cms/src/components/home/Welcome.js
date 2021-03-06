import React, { Component, Fragment, lazy, Suspense } from "react";
import "./Welcome.css";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
import { WELCOME_URL } from "../../utils/Constants";
// import { Query } from "react-apollo";
// import { gql } from "apollo-boost";

// const CURRENT_SYSTEM = gql`
//     {
//         currentSystem @client
//     }
// `;

const SidebarContainer = styled.div`
    width: 260px;
    height: 100vh;
`;

const ContainerDiv = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    background-color: #f4f4f4;
`;

const SidebarDiv = styled.div`
    width: 260px;
    background-color: white;
    position: fixed;
    color: black;
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
`;

const ContentDiv = styled.div`
    width: calc(100vw - 260px);
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
    padding: 5% 0 5% 15%;
`;

const SidebarNormal = styled.div`
    width: 100%;
    background: white;
    color: black;
    font-weight: 700;
    padding: 5% 0 5% 15%;
    text-align: left;
`;

// const styles = () => ({
//     sidebarButtonSelected: {
//         background: "rgb(113, 113, 113)",
//         color: "white",
//         fontWeight: 700,
//         borderRadius: 10,
//         marginTop: 20
//     },
//     sidebarButtonNormal: {
//         background: "white",
//         color: "black",
//         fontWeight: 700,
//         borderRadius: 10,
//         marginTop: 20
//     }
// });

// const WelcomeSystems = lazy(() => import("./WelcomeSystems"));
const WelcomeAccount = lazy(() => import("./WelcomeAccount"));
const WelcomeDashboard = lazy(() => import("./WelcomeDashboard"));
const WelcomeClients = lazy(() => import("./WelcomeClients"));
const WelcomeGuide = lazy(() => import("./WelcomeGuide"));

class Welcome extends Component {
    sidebarButtons = [
        { id: "dashboard", name: "DASHBOARD", component: WelcomeDashboard },
        // { id: "systems", name: "SYSTEMS", component: WelcomeSystems },
        { id: "clients", name: "CLIENTS", component: WelcomeClients },
        { id: "guide", name: "JUST BRILLIANT GUIDES", component: WelcomeGuide },
        { id: "account", name: "ACCOUNT", component: WelcomeAccount }
        // { id: "theme", name: "THEME SETTINGS", component: WelcomeSystems },
        // { id: "users", name: "USERS & ROLES", component: WelcomeSystems },
        // { id: "support", name: "SUPPORT", component: WelcomeSystems }
    ];
    state = {
        selected: "dashboard"
    };

    componentDidMount() {
        const { match } = this.props;
        if (match && match.params && match.params.which) {
            this.setState({ selected: match.params.which });
        }
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props;
        const { match: prevMatch } = prevProps;
        if (
            prevMatch &&
            prevMatch.params &&
            prevMatch.params.which &&
            match &&
            match.params &&
            match.params.which &&
            prevMatch.params.which !== match.params.which
        ) {
            this.setState({ selected: match.params.which });
        }
    }

    clickSidebarButton(selected) {
        this.setState({ selected }, () => {
            this.props.history.push(WELCOME_URL + "/" + selected);
        });
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
                <SidebarContainer>
                    <SidebarDiv>
                        <div
                            style={{
                                height: "160px",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {user.client && user.client.avatar && (
                                <img
                                    src={user.client.avatar}
                                    style={{
                                        width: "60%",

                                        margin: "0 auto"
                                    }}
                                    alt={`${user.client.name} avatar`}
                                />
                            )}
                        </div>
                        {/* <SidebarHeaderTitle>
                            <span style={{ fontSize: "4em", paddingRight: 5 }}>
                                PORTAL
                            </span>
                            <span style={{ fontSize: "1.5em" }}>
                                <div>ADMIN</div>
                                <div>CONSOLE</div>
                            </span>
                        </SidebarHeaderTitle> */}
                        {this.renderSidebarButtons()}
                    </SidebarDiv>
                </SidebarContainer>

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

// export default withApollo(withStyles(styles)(Welcome));
export default withApollo(Welcome);
