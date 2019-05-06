import React from "react";
import styled from "styled-components";
import { Query, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { getAllClients } from "../../data/query";
import Loading from "../loading/Loading";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import {
    CREATE_NEW_CLIENT,
    CLIENT_CMS_URL,
    WELCOME_URL_CLIENT
} from "../../utils/Constants";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(244, 244, 244);
    padding-left: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const EntryContainerDiv = styled.div`
    width: 35%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
`;

const EntryTitleDiv = styled.div`
    font-size: 1.5em;
    padding-bottom: 30px;
`;

const EntryEntryContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const EntryCardDiv = styled.div`
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const styles = () => ({
    card: {
        padding: 20,
        width: 200,
        height: 200,
        marginBottom: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    card_media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: "fill"
    },
    addIcon: {
        fontSize: "large",
        width: 100,
        height: 100,
        color: "gray"
    }
});

export const WelcomeDashboard = ({ classes }) => (
    <Query query={getAllClients}>
        {({ loading, error, data: { clients } }) => {
            console.log(clients);
            if (loading) return <Loading loadingData />;
            if (error) return `Error! ${error.message}`;
            return (
                <ContainerDiv>
                    <EntryContainerDiv>
                        <EntryTitleDiv>CLIENTS</EntryTitleDiv>
                        <EntryEntryContainerDiv>
                            <EntryCardDiv>
                                <Link
                                    to={CREATE_NEW_CLIENT}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Card className={classes.card}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                padding: 5,
                                                border:
                                                    "2px solid rgb(238,238,238)",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <AddIcon
                                                className={classes.addIcon}
                                            />
                                            <span
                                                style={{
                                                    color: "gray",
                                                    fontSize: "1.3em"
                                                }}
                                            >
                                                Add client
                                            </span>
                                        </div>
                                    </Card>
                                </Link>
                            </EntryCardDiv>
                            {clients.map((client, index) => (
                                <EntryCardDiv
                                    key={`client-${client.id}-${index}`}
                                >
                                    <Card className={classes.card}>
                                        <a
                                            href={
                                                CLIENT_CMS_URL +
                                                WELCOME_URL_CLIENT +
                                                "/" +
                                                client.id
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <CardMedia
                                                component="img"
                                                alt={`${
                                                    client.name
                                                } alt avatar`}
                                                className={classes.card_media}
                                                image={client.avatar}
                                            />
                                        </a>
                                    </Card>
                                </EntryCardDiv>
                            ))}
                        </EntryEntryContainerDiv>
                    </EntryContainerDiv>
                    <EntryContainerDiv>
                        <EntryTitleDiv>JUST BRILLIANT GUIDES</EntryTitleDiv>
                    </EntryContainerDiv>
                </ContainerDiv>
            );
        }}
    </Query>
);

export default withApollo(withStyles(styles)(WelcomeDashboard));
