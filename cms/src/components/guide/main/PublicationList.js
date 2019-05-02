import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import dayJs from "dayjs";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 20px;
`;

const HeaderDiv = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
`;

const PublicationListContainerDiv = styled.div`
    width: 100%;
    height: 80%;
    overflow-x: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
`;

const PublicationEntryContainerDiv = styled.div`
    width: 20%;
    height: 100%;
    background-color: white;
    border: 1px solid rgb(220, 220, 220);
    margin-right: 20px;
`;

const PublicationMoreIconContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const PublicationImageContainerDiv = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
`;

const PublicationNameContainerDiv = styled.div`
    margin-top: -20px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    font-size: 1.5em;
    font-weight: 700;
    border-bottom: 2px solid black;
    color: black;
`;

const PublicationUpdatedContainerDiv = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    color: rgb(157, 157, 157);
`;

const styles = theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "40%"
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4
    },
    addButton: {
        margin: theme.spacing.unit,
        color: "rgb(134,195,247)",
        border: "1px solid rgb(134,195,247)",
        width: "100%",
        backgroundColor: "white"
    }
});

const PublicationList = ({ data: { publications }, classes }) => {
    const [search, setSearch] = useState("");

    const handleSearch = event => setSearch(event.target.value);

    const renderSearchField = () => (
        <Paper className={classes.root} elevation={1}>
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Type to start searching"
                onChange={handleSearch}
                value={search}
            />
        </Paper>
    );

    const handleClickMore = id => _event => {
        console.log("Clicked Publication: ", id);
        //TODO: ADD EVENT HANDLER HERE
    };

    const formatDate = dateValue => dayJs(dateValue).format("D MMM YYYY");

    const renderPublicationList = () => {
        const toLoop =
            search.length > 0
                ? publications.filter(({ name }) =>
                      name.toLowerCase().includes(search.toLowerCase())
                  )
                : publications;
        return (
            <PublicationListContainerDiv>
                {toLoop.map(
                    ({ id, name, updatedAt, media: [{ path }] }, index) => (
                        <PublicationEntryContainerDiv
                            key={`PUB-${index}-${id}`}
                        >
                            <PublicationMoreIconContainerDiv>
                                <IconButton onClick={handleClickMore(id)}>
                                    <MoreIcon />
                                </IconButton>
                            </PublicationMoreIconContainerDiv>
                            <PublicationImageContainerDiv>
                                <img
                                    src={path}
                                    alt={name}
                                    style={{
                                        height: "90%"
                                    }}
                                />
                            </PublicationImageContainerDiv>
                            <PublicationNameContainerDiv>
                                {name}
                            </PublicationNameContainerDiv>
                            <PublicationUpdatedContainerDiv>
                                Last updated: {formatDate(updatedAt)}
                            </PublicationUpdatedContainerDiv>
                        </PublicationEntryContainerDiv>
                    )
                )}
            </PublicationListContainerDiv>
        );
    };

    return (
        <ContainerDiv>
            <HeaderDiv>
                <div style={{ width: "80%" }}>{renderSearchField()}</div>
                <div style={{ width: "10%" }}>
                    <Button
                        variant="outlined"
                        component="span"
                        className={classes.addButton}
                    >
                        Add Publication
                    </Button>
                </div>
            </HeaderDiv>
            {renderPublicationList()}
        </ContainerDiv>
    );
};

export default withStyles(styles)(PublicationList);
