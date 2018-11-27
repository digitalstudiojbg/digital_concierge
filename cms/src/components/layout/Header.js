import React, { Component } from "react";
import { COLOR_JBG_PURPLE } from "../../utils/Constants";
import { withRouter } from "react-router";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import styled from 'styled-components';

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
    width: 15vw;
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
        const { client, match } = this.props;
        const { getCurrentUser: user } = client.readQuery({
            query
        });

        return (
            <ContainerDiv>
                {match.url === URL_WELCOME && <WelcomeDiv>Welcome</WelcomeDiv>}
                <div
                    style={{
                        width: "65vw"
                    }}
                />
                <div
                    style={{
                        width: "20vw",
                        marginRight: "1.5vw"
                    }}
                >
                    {match.url === URL_WELCOME && (
                        <WelcomeUserDetailContainerDiv>
                            <div
                                style={{
                                    paddingLeft: "1vw",
                                    paddingRight: "1vw",
                                    borderLeft: "2px solid white"
                                }}
                            >
                                <p style={{}}>{user.name}</p>
                            </div>
                            <div>
                                <img
                                    style={{
                                        height: "50px"
                                    }}
                                    src={user.venue.logo}
                                    alt={`{user.name}_avatar`}
                                />
                            </div>
                        </WelcomeUserDetailContainerDiv>
                    )}
                </div>
            </ContainerDiv>
        );
    }
}

export default withApollo(withRouter(Header));
