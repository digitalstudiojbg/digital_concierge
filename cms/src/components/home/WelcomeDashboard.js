import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import {
    getAllClients,
    getJustBrilliantGuideListDashboard
} from "../../data/query";
import Loading from "../loading/Loading";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import {
    CREATE_NEW_CLIENT,
    CLIENT_CMS_URL,
    WELCOME_URL_CLIENT,
    randomiseItems,
    GUIDE_MAIN_URL,
    PORTAL_URL,
    WELCOME_URL,
    GUIDE_CREATE_NEW_URL
} from "../../utils/Constants";
import { isEmpty } from "lodash";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const PageHeader = styled.h2`
    font-size: 30px;
    padding-top: 3%;
    padding-left: 3%;
    font-weight: bold;
    margin-right: -5%;
`;
export const MainSection = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
`;

export const SectionDiv = styled.div`
    width: 40%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    padding: 0 4%;
    justify-content: center;
`;

const SubSectionDiv = styled.div`
    margin: 5px 0;
    display: flex;
    flex-wrap: wrap;
    height: 500px;
    overflow: hidden;
`;

const SectionHeader = styled.h4`
    text-align: left;
    color: #2699fb;
    font-size: 20px;
    padding: 0px;
    margin-bottom: 40px;
`;

const EntryCardDiv = styled.div`
    flex-basis: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const styles = () => ({
    card: {
        padding: "4%",
        width: 230,
        height: 230,
        marginBottom: 20,
        // width: "95%",
        // height: "95%",
        // marginBottom: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "@media screen and (max-width: 1700px)": {
            width: 170,
            height: 170
        }
    },
    card_media: {
        // ⚠️ object-fit is not supported by IE 11.
        // objectFit: "fill",
        // objectFit: "contain",
        // height: 200,
        // width: "auto"
        height: "100%",
        width: "100%",
        objectFit: "contain"
    },
    addIcon: {
        fontSize: "large",
        width: 100,
        height: 100,
        color: "gray"
    }
});

const AMOUNT_IN_LIST = 3;

export const WelcomeDashboard = ({ classes }) => (
    <Query query={getAllClients}>
        {({ loading, error, data: { clients } }) => {
            // console.log(clients);
            if (loading) return <Loading loadingData />;
            if (error) return `Error! ${error.message}`;
            return (
                <Query query={getJustBrilliantGuideListDashboard}>
                    {({
                        loading: loadingGuide,
                        error: errorGuide,
                        data: { justBrilliantGuides: guides }
                    }) => {
                        if (loadingGuide) return <Loading loadingData />;
                        if (errorGuide) return `Error! ${errorGuide.message}`;
                        const randomisedGuides =
                            Array.isArray(guides) && !isEmpty(guides)
                                ? randomiseItems(guides)
                                : [];
                        // console.log(randomisedGuides);
                        return (
                            <ContainerDiv>
                                <PageHeader>Dashboard</PageHeader>
                                <br />
                                <MainSection>
                                    <SectionDiv>
                                        <SectionHeader>CLIENTS</SectionHeader>
                                        <SubSectionDiv>
                                            <EntryCardDiv>
                                                <Link
                                                    to={CREATE_NEW_CLIENT}
                                                    style={{
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <Card
                                                        className={classes.card}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                padding: 5,
                                                                border:
                                                                    "2px solid rgb(238,238,238)",
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center"
                                                            }}
                                                        >
                                                            <AddIcon
                                                                className={
                                                                    classes.addIcon
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    color:
                                                                        "gray",
                                                                    fontSize:
                                                                        "1.3em"
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
                                                    key={`client-${
                                                        client.id
                                                    }-${index}`}
                                                >
                                                    <Card
                                                        className={classes.card}
                                                    >
                                                        <div
                                                            style={{
                                                                height: "100%",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <a
                                                                href={
                                                                    CLIENT_CMS_URL +
                                                                    WELCOME_URL_CLIENT +
                                                                    "/" +
                                                                    client.id
                                                                }
                                                                // target="_blank"
                                                                // rel="noopener noreferrer"
                                                            >
                                                                <CardMedia
                                                                    component="img"
                                                                    alt={`${
                                                                        client.name
                                                                    } alt avatar`}
                                                                    className={
                                                                        classes.card_media
                                                                    }
                                                                    image={
                                                                        client.avatar
                                                                    }
                                                                />
                                                            </a>
                                                        </div>
                                                    </Card>
                                                </EntryCardDiv>
                                            ))}
                                        </SubSectionDiv>
                                        <Link
                                            to={WELCOME_URL + "/clients"}
                                            style={{
                                                textDecoration: "none",
                                                width: "100%",
                                                display: "flex",
                                                color: "black",
                                                justifyContent: "flex-end",
                                                fontWeight: "bold",
                                                paddingRight: "4%"
                                            }}
                                        >
                                            VIEW ALL >
                                        </Link>
                                    </SectionDiv>
                                    <SectionDiv>
                                        <SectionHeader>
                                            JUST BRILLIANT GUIDES
                                        </SectionHeader>
                                        <SubSectionDiv>
                                            <EntryCardDiv>
                                                <Link
                                                    to={GUIDE_CREATE_NEW_URL}
                                                    style={{
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <Card
                                                        className={classes.card}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                padding: 5,
                                                                border:
                                                                    "2px solid rgb(238,238,238)",
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center"
                                                            }}
                                                        >
                                                            <AddIcon
                                                                className={
                                                                    classes.addIcon
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    color:
                                                                        "gray",
                                                                    fontSize:
                                                                        "1.3em"
                                                                }}
                                                            >
                                                                Add guide
                                                            </span>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </EntryCardDiv>
                                            {randomisedGuides.length > 0 &&
                                                randomisedGuides
                                                    .slice(0, AMOUNT_IN_LIST)
                                                    .map(
                                                        (
                                                            {
                                                                id,
                                                                name,
                                                                media: [media]
                                                            },
                                                            index
                                                        ) => (
                                                            <EntryCardDiv
                                                                key={`guide-${id}-${index}`}
                                                            >
                                                                <Card
                                                                    className={
                                                                        classes.card
                                                                    }
                                                                >
                                                                    <div
                                                                        style={{
                                                                            height:
                                                                                "100%",
                                                                            width:
                                                                                "100%"
                                                                        }}
                                                                    >
                                                                        <a
                                                                            href={
                                                                                PORTAL_URL +
                                                                                GUIDE_MAIN_URL.replace(
                                                                                    ":pub_id",
                                                                                    id
                                                                                )
                                                                            }
                                                                            // target="_blank"
                                                                            // rel="noopener noreferrer"
                                                                        >
                                                                            <CardMedia
                                                                                component="img"
                                                                                alt={`${name} alt avatar`}
                                                                                className={
                                                                                    classes.card_media
                                                                                }
                                                                                image={
                                                                                    media.path
                                                                                }
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                </Card>
                                                            </EntryCardDiv>
                                                        )
                                                    )}
                                        </SubSectionDiv>
                                        <Link
                                            to={WELCOME_URL + "/guide"}
                                            style={{
                                                textDecoration: "none",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row-reverse",
                                                paddingRight: "4%",
                                                color: "black",
                                                fontWeight: 600
                                            }}
                                        >
                                            VIEW ALL >
                                        </Link>
                                    </SectionDiv>
                                </MainSection>
                            </ContainerDiv>
                        );
                    }}
                </Query>
            );
        }}
    </Query>
);

export default withStyles(styles)(WelcomeDashboard);
