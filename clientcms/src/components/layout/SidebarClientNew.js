import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Query } from "react-apollo";
import { getClientDetail as query } from "../../data/query";
import { WELCOME_URL } from "../../utils/Constants";
import { isEmpty } from "lodash";
import Loading from "../loading/Loading";

const SidebarContainer = styled.div`
    width: 260px;
    height: 100vh;
`;

const SidebarDiv = styled.div`
    /* width: 260px;
    background-color: rgb(252, 252, 252);
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center; */
    width: 260px;
    background-color: white;
    position: fixed;
    color: black;
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
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

const SidebarNewClient = ({ history, selected, match }) => {
    // console.log("history ", history);
    // console.log("Selected ", selected);
    // console.log("match ", match);
    const { params } = match || {};
    const { client_id = "" } = params;

    const SIDEBAR_BUTTONS = [
        {
            id: "systems",
            name: "SYSTEMS",
            linkTo: `${WELCOME_URL}/${client_id}/systems`
        },
        {
            id: "account",
            name: "ACCOUNT",
            linkTo: `${WELCOME_URL}/${client_id}/account`
        },
        {
            id: "theme",
            name: "THEME SETTINGS",
            linkTo: `${WELCOME_URL}/${client_id}/theme`
        },
        {
            id: "users",
            name: "USERS & STRUCTURES",
            linkTo: `${WELCOME_URL}/${client_id}/users`
        },
        {
            id: "support",
            name: "SUPPORT",
            linkTo: `${WELCOME_URL}/${client_id}/support`
        }
    ];

    const handleNavigate = link => _event => history.push(link);

    const renderSidebarButtons = () => (
        <React.Fragment>
            {SIDEBAR_BUTTONS.map(({ id, name, linkTo }) => (
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
        <Query query={query} variables={{ id: client_id }}>
            {({ loading, error, data: { client } }) => {
                if (loading) return <Loading loadingData />;
                if (error)
                    return (
                        <React.Fragment>Error! {error.message}</React.Fragment>
                    );
                // console.log("!isEmpty(client) ", !isEmpty(client));
                // console.log(
                //     "Array.isArray(client.media) ",
                //     Array.isArray(client.media)
                // );
                // console.log("!isEmpty(client.media) ", !isEmpty(client.media));
                // console.log(
                //     "!isEmpty(client.media[0]) ",
                //     !isEmpty(client.media[0])
                // );
                // console.log(
                //     "Boolean(client.media[0].path) ",
                //     Boolean(client.media[0].path)
                // );
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
                                {!isEmpty(client) &&
                                    Array.isArray(client.media) &&
                                    !isEmpty(client.media) &&
                                    !isEmpty(client.media[0]) &&
                                    Boolean(client.media[0].path) && (
                                        <img
                                            src={client.media[0].path}
                                            style={{
                                                width: "60%",

                                                margin: "0 auto"
                                            }}
                                            alt={`${client.name} avatar`}
                                        />
                                    )}
                            </div>
                            {renderSidebarButtons()}
                        </SidebarDiv>
                    </SidebarContainer>
                );
            }}
        </Query>
    );
};

SidebarNewClient.propTypes = {
    selected: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired
};

export default SidebarNewClient;
