import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import dayJs from "dayjs";
import { withRouter } from "react-router-dom";
import { GUIDE_MAIN_URL, GUIDE_CREATE_NEW_URL } from "../../../utils/Constants";
import { isEmpty } from "lodash";

import {
    ContainerDiv,
    HeaderDiv,
    PublicationListContainerDiv,
    PublicationEntryContainerDiv,
    PublicationMoreIconContainerDiv,
    PublicationImageContainerDiv,
    PublicationName,
    PublicationUpdated
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
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    iconVariant: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        margin: theme.spacing.unit
    }
});

const PublicationList = ({
    data: { publications },
    classes,
    history,
    otherProps: { error, duplicateAction }
}) => {
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(
        isEmpty(error) ? false : true
    );

    const handleSearch = event => setSearch(event.target.value);
    const closeSnackbar = () => setOpenSnackbar(false);

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

    const handleClickEditMenu = () => {
        const pub_id =
            Boolean(anchorEl) && Boolean(anchorEl.id) ? anchorEl.id : null;
        setAnchorEl(null);
        Boolean(pub_id) &&
            history.push(GUIDE_MAIN_URL.replace(":pub_id", anchorEl.id));
    };

    const handleCloseMenu = () => setAnchorEl(null);

    const handleClickDuplicateMenu = () => {
        const id =
            Boolean(anchorEl) && Boolean(anchorEl.id) ? anchorEl.id : null;
        setAnchorEl(null);
        Boolean(id) && duplicateAction({ variables: { id } });
    };

    const renderPublicationList = () => {
        const toLoop =
            search.length > 0
                ? publications.filter(({ name }) =>
                      name.toLowerCase().includes(search.toLowerCase())
                  )
                : publications;

        return (
            <PublicationListContainerDiv>
                {toLoop.map(({ id, name, updatedAt, media }, index) => (
                    <PublicationEntryContainerDiv key={`PUB-${index}-${id}`}>
                        <PublicationMoreIconContainerDiv>
                            <IconButton id={id} onClick={handleClickMore}>
                                <MoreIcon />
                            </IconButton>
                        </PublicationMoreIconContainerDiv>
                        <PublicationImageContainerDiv
                            onClick={handleClickPublication(id)}
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
                                {Array.isArray(media) &&
                                    !isEmpty(media) &&
                                    !isEmpty(media[0]) &&
                                    Boolean(media[0].path) && (
                                        <img
                                            src={path}
                                            alt={name}
                                            style={{
                                                height: "90%"
                                            }}
                                        />
                                    )}
                            </PublicationImageContainerDiv>
                            <PublicationName>{name}</PublicationName>
                            <PublicationUpdated>
                                Last updated: {formatDate(updatedAt)}
                            </PublicationUpdated>
                        </PublicationImageContainerDiv>
                    </PublicationEntryContainerDiv>
                ))}
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
                    <MenuItem onClick={handleClickEditMenu}>EDIT</MenuItem>
                    <MenuItem onClick={handleClickDuplicateMenu}>
                        DUPLICATE
                    </MenuItem>
                </Menu>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={closeSnackbar}
                >
                    <SnackbarContent
                        className={classes.error}
                        aria-describedby="client-snackbar"
                        message={
                            <span
                                id="client-snackbar"
                                className={classes.message}
                            >
                                <ErrorIcon className={classes.iconVariant} />
                                {!isEmpty(error) && (
                                    <React.Fragment>
                                        {error.message}
                                    </React.Fragment>
                                )}
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={closeSnackbar}
                            >
                                <CloseIcon className={classes.icon} />
                            </IconButton>
                        ]}
                    />
                </Snackbar>
            </PublicationListContainerDiv>
        );
    };

    const navigateToCreatePublication = () =>
        history.push(GUIDE_CREATE_NEW_URL);

    return (
        <ContainerDiv style={{ flexDirection: "column" }}>
            <HeaderDiv>
                <div style={{ width: "80%" }}>{renderSearchField()}</div>
                <div style={{ width: "150px" }}>
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
