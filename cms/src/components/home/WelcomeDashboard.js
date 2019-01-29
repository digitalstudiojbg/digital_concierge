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
import { CREATE_NEW_CLIENT } from "../../utils/Constants";

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
    width: 50%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const EntryTitleDiv = styled.div`
    font-size: 1.5em;
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
        {({ loading, error, data: { clients: clients } }) => {
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
                                        <AddIcon className={classes.addIcon} />
                                        <span
                                            style={{
                                                color: "gray",
                                                fontSize: "1.3em"
                                            }}
                                        >
                                            Add client
                                        </span>
                                    </Card>
                                </Link>
                            </EntryCardDiv>
                            {clients.map((client, index) => (
                                <EntryCardDiv
                                    key={`client-${client.id}-${index}`}
                                >
                                    <Card className={classes.card}>
                                        <CardMedia
                                            component="img"
                                            alt={`${client.name} alt avatar`}
                                            className={classes.card_media}
                                            image={client.avatar}
                                        />
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
