import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
// import { LayoutImageDiv } from "../../../utils/Constants";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
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

    const renderPublicationList = () => {
        const toLoop =
            search.length > 0
                ? publications.filter(({ name }) =>
                      name.toLowerCase().includes(search.toLowerCase())
                  )
                : publications;
        return (
            <PublicationListContainerDiv>
                {toLoop.map(({ id, name, media: [{ path }] }, index) => (
                    <PublicationEntryContainerDiv key={`PUB-${index}-${id}`}>
                        <img src={path} alt={name} style={{ height: "80%" }} />
                        {name}
                    </PublicationEntryContainerDiv>
                ))}
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
