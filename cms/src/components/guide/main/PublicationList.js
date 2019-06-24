import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import dayJs from "dayjs";
import { withRouter } from "react-router-dom";
import { GUIDE_MAIN_URL, GUIDE_CREATE_NEW_URL } from "../../../utils/Constants";

import {
    ContainerDiv,
    HeaderDiv,
    PublicationListContainerDiv,
    PublicationEntryContainerDiv,
    PublicationMoreIconContainerDiv,
    PublicationImageContainerDiv,
    PublicationNameContainerDiv,
    PublicationUpdatedContainerDiv
} from "../GuideStyleSet";

const styles = theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "40%",
        border: "1px solid rgba(221, 221, 221)"
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
        color: "#2699FB",
        border: "3px solid #2699FB",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "8px 0"
    }
});

const PublicationList = ({ data: { publications }, classes, history }) => {
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

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

    const handleClickMore = event => {
        console.log("Clicked Publication: ", event.currentTarget.id);
        setAnchorEl(event.currentTarget);
    };

    const formatDate = dateValue => dayJs(dateValue).format("D MMM YYYY");

    const handleClickPublication = id => _event => {
        history.push(GUIDE_MAIN_URL.replace(":pub_id", id));
    };

    const handleCloseMenu = () => setAnchorEl(null);

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
                                <IconButton
                                    id={id}
                                    onClick={handleClickMore}
                                    style={{ padding: "5px" }}
                                >
                                    <MoreIcon />
                                </IconButton>
                            </PublicationMoreIconContainerDiv>
                            <PublicationImageContainerDiv
                                onClick={handleClickPublication(id)}
                            >
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
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <MenuItem>EDIT</MenuItem>
                    <MenuItem>DUPLICATE</MenuItem>
                </Menu>
            </PublicationListContainerDiv>
        );
    };

    const navigateToCreatePublication = () =>
        history.push(GUIDE_CREATE_NEW_URL);

    return (
        <ContainerDiv style={{ flexDirection: "column" }}>
            <HeaderDiv>
                <div style={{ width: "80%" }}>{renderSearchField()}</div>
                <div style={{ width: "10%" }}>
                    <Button
                        variant="outlined"
                        component="span"
                        className={classes.addButton}
                        onClick={navigateToCreatePublication}
                    >
                        Add Publication
                    </Button>
                </div>
            </HeaderDiv>
            {renderPublicationList()}
        </ContainerDiv>
    );
};

export default withRouter(withStyles(styles)(PublicationList));
