import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MediaLibrary from "./MediaLibraryClientCMS";
import PropTypes from "prop-types";
import styled from "styled-components";

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

const SectionHeader = styled.h4`
    text-align: left;
    color: #2699fb;
    font-size: 20px;
    padding: 0px;
    width: 100%;
`;

const styles = () => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

const BrowserMedia = ({
    buttonLabel,
    color,
    variant,
    buttonStyle,
    fullWidth,
    multipleSelect,
    classes,
    updateImageSelection,
    clientId
}) => {
    const [browserMediaOpen, setBrowserMediaOpen] = useState(false);

    const handleClose = () => {
        setBrowserMediaOpen(false);
    };

    const updateImages = images => {
        updateImageSelection(images);
        handleClose();
    };

    return (
        <React.Fragment>
            <Button
                variant={variant}
                color={color}
                style={buttonStyle}
                onClick={() => {
                    setBrowserMediaOpen(true);
                }}
                fullWidth={fullWidth}
            >
                {buttonLabel}
            </Button>

            <Dialog
                open={browserMediaOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                fullWidth
                maxWidth="xl"
            >
                <div style={{ padding: "2%" }}>
                    <DialogTitle
                        disableTypography
                        className={classes.dialogTitle}
                    >
                        <SectionHeader>BROWSER MEDIA</SectionHeader>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <MediaLibrary
                            clientId={clientId}
                            setSelectedImages={updateImages}
                            isBrowserMedia
                            height={"100%"}
                            multipleSelect={multipleSelect}
                        />
                    </DialogContent>
                </div>
            </Dialog>
        </React.Fragment>
    );
};

BrowserMedia.defaultProps = {
    buttonLabel: "BROWSE MEDIA",
    color: "primary",
    variant: "contained",
    buttonStyle: {},
    fullWidth: false,
    multipleSelect: false
};

BrowserMedia.propTypes = {
    buttonLabel: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    buttonStyle: PropTypes.object,
    fullWidth: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    updateImageSelection: PropTypes.func.isRequired,
    clientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
};

export default withStyles(styles)(BrowserMedia);
