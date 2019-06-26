import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import { getCurrentUserQuery as query } from "../../data/query";
import { WELCOME_URL } from "../../utils/Constants";

const sidebarButtons = [
    { id: "dashboard", name: "DASHBOARD", linkTo: WELCOME_URL + "/dashboard" },
    { id: "clients", name: "CLIENTS", linkTo: WELCOME_URL + "/clients" },
    {
        id: "guide",
        name: "JUST BRILLIANT GUIDES",
        linkTo: WELCOME_URL + "/guide"
    },
    { id: "account", name: "ACCOUNT", linkTo: WELCOME_URL + "/account" },
    { id: "settings", name: "SETTINGS", linkTo: WELCOME_URL + "/settings" }
];

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
const SidebarContainer = styled.div`
    width: 305px;
    height: 100vh;
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
    //  text-align: center;
`;

const SidebarNormal = styled.div`
    width: 100%;
    background: white;
    color: black;
    font-weight: 700;
    padding: 5% 0 5% 15%;
    text-align: left;
`;

const SidebarNew = ({ client, history, selected }) => {
    const { getCurrentUser: user } = client.readQuery({ query });

    const handleNavigate = link => _event => history.push(link);

    const renderSidebarButtons = () => (
        <React.Fragment>
            {sidebarButtons.map(({ id, name, linkTo }) => (
                <React.Fragment key={id}>
                    {selected === id ? (
                        <SidebarSelected onClick={handleNavigate(linkTo)}>
                            {name}
                        </SidebarSelected>
                    ) : (
                        <SidebarNormal onClick={handleNavigate(linkTo)}>
                            {name}
                        </SidebarNormal>
                    )}
                </React.Fragment>
            ))}
        </React.Fragment>
    );

    return (
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
                {renderSidebarButtons()}
            </SidebarDiv>
        </SidebarContainer>
    );
};

SidebarNew.propTypes = {
    selected: PropTypes.string.isRequired
};

export default withApollo(SidebarNew);
