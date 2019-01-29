import React from "react";
import styled from "styled-components";
import { getSystemsFromUser } from "../../data/query";
import { Query, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { SYSTEM_INDEX_URL } from "../../utils/Constants";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SubtitleContainerDiv = styled.div`
    height: 10%;
    color: black;
    font-size: 2em;
    font-weight: 700;
`;

const InnerContainerDiv = styled.div`
    height: 60%;
    display: flex;
    color: black;
    flex-wrap: wrap;
`;

const system_entry_style = {
    flexBasis: "25%",
    height: "50%",
    backgroundColor: "white",
    border: "2px solid black",
    marginRight: "10px",
    textDecoration: "none",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.7em",
    padding: 10
};

const WelcomeSystems = () => (
    <ContainerDiv>
        <Query query={getSystemsFromUser}>
            {({ loading, error, data: { systemsByUser: systems } }) => {
                if (loading) return <Loading loadingData />;
                if (error) return `Error! ${error.message}`;
                return (
                    <React.Fragment>
                        <SubtitleContainerDiv>
                            PLEASE SELECT SYSTEM TO EDIT
                        </SubtitleContainerDiv>
                        <InnerContainerDiv>
                            {systems.map(system => (
                                <Link
                                    style={system_entry_style}
                                    key={system.id}
                                    to={SYSTEM_INDEX_URL.replace(
                                        ":system_id",
                                        system.id
                                    )}
                                >
                                    {system.name}
                                </Link>
                            ))}
                        </InnerContainerDiv>
                    </React.Fragment>
                );
            }}
        </Query>
    </ContainerDiv>
);

export default withApollo(WelcomeSystems);
